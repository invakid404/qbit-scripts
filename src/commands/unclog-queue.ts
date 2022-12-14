import { Command, Flags } from '@oclif/core';
import { QBittorrent } from '../lib/qbit';
import dayjs from 'dayjs';
import { durationFlag } from '../lib/flags';

export default class UnclogQueue extends Command {
  static description = 'move stalled torrents to the end of the queue';

  static examples = [
    '<%= config.bin %> <%= command.id %> -h https://qbit.example.com -u admin -p adminadmin',
  ];

  static flags = {
    host: Flags.string({ char: 'h', description: 'qbit host', required: true }),
    username: Flags.string({
      char: 'u',
      description: 'qbit username',
      required: true,
    }),
    password: Flags.string({
      char: 'p',
      description: 'qbit password',
      required: true,
    }),
    threshold: durationFlag({
      char: 't',
      description: 'min active time to be considered stalled',
      default: dayjs.duration(1, 'hour'),
      defaultHelp: async () => '1h',
    }),
  };

  public async run(): Promise<void> {
    const {
      flags: { host, username, password, threshold },
    } = await this.parse(UnclogQueue);

    const qbitAPI = new QBittorrent(host, username, password);

    this.log('Querying stalled torrents...');
    const stalledTorrentsList = await qbitAPI.getTorrentList({
      filter: 'stalled_downloading',
    });

    this.log(`Found ${stalledTorrentsList.length} stalled torrent(s)`);

    this.log(
      `Fetching tracker info for ${stalledTorrentsList.length} torrent(s)`,
    );

    const torrentsWithTrackerInfo = await Promise.all(
      stalledTorrentsList.map(async (torrent) => {
        return {
          ...torrent,
          trackers: await qbitAPI.getTrackers(torrent.hash),
        };
      }),
    );

    const inactivityDate = dayjs().subtract(threshold);

    const inactiveTorrents = stalledTorrentsList.filter(
      ({ lastActivity, timeActive }) => {
        const lastActivityDate = dayjs.unix(lastActivity);
        const timeActiveDuration = dayjs.duration(timeActive, 'seconds');

        return (
          lastActivityDate.isBefore(inactivityDate) &&
          threshold.asSeconds() <= timeActiveDuration.asSeconds()
        );
      },
    );

    const torrentsWithNoSeeders = torrentsWithTrackerInfo.filter((torrent) => {
      const isFullyUpdated = torrent.trackers.every(
        ({ numSeeds }) => numSeeds !== -1,
      );
      if (!isFullyUpdated) {
        return false;
      }

      const totalSeeders = torrent.trackers.reduce(
        (acc, tracker) => acc + tracker.numSeeds,
        0,
      );

      return totalSeeders === 0;
    });

    const torrentHashesToMove = [
      ...new Set(
        [...inactiveTorrents, ...torrentsWithNoSeeders].map(({ hash }) => hash),
      ),
    ];

    this.log(
      `Found ${torrentHashesToMove.length} torrent(s) that are clogging the queue`,
    );

    if (torrentHashesToMove.length === 0) {
      return;
    }

    this.log('Moving torrent(s) to the end of the queue...');
    await qbitAPI.moveToBottom(torrentHashesToMove);

    this.log('Pausing and resuming torrent(s)...');
    await qbitAPI.pause(torrentHashesToMove);
    await qbitAPI.resume(torrentHashesToMove);
  }
}
