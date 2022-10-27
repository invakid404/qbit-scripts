import {Command, Flags} from '@oclif/core'
import {QBittorrent} from '../lib/qbit'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export default class UnclogQueue extends Command {
  static description = 'move stalled torrents to the end of the queue'

  static examples = [
    '<%= config.bin %> <%= command.id %> -h https://qbit.example.com -u admin -p adminadmin',
  ]

  static flags = {
    host: Flags.string({char: 'h', description: 'qbit host', required: true}),
    username: Flags.string({char: 'u', description: 'qbit username', required: true}),
    password: Flags.string({char: 'p', description: 'qbit password', required: true}),
    time: Flags.integer({char: 't', description: 'min active time to be considered stalled (in minutes)', default: 60}),
  }

  public async run(): Promise<void> {
    const {flags: {host, username, password, time}} = await this.parse(UnclogQueue)

    const qbitAPI = new QBittorrent(host, username, password)

    this.log('Querying stalled torrents...')
    const stalledTorrentsList = await qbitAPI.getTorrentList({
      filter: 'stalled_downloading',
    })

    this.log(`Found ${stalledTorrentsList.length} stalled torrent(s)`)

    const threshold = dayjs.duration(time, 'minutes')
    const inactivityDate = dayjs().subtract(threshold)

    const torrentHashesToMove = stalledTorrentsList.filter(({lastActivity, timeActive}) => {
      const lastActivityDate = dayjs.unix(lastActivity)
      const timeActiveDuration = dayjs.duration(timeActive, 'seconds')

      return lastActivityDate.isBefore(inactivityDate) && threshold.asSeconds() <= timeActiveDuration.asSeconds()
    }).map(({hash}) => hash)

    this.log(`Found ${torrentHashesToMove.length} torrent(s) that are clogging the queue`)

    this.log('Moving torrent(s) to the end of the queue...')
    await qbitAPI.moveToBottom(torrentHashesToMove)

    this.log('Pausing and resuming torrent(s)...')
    await qbitAPI.pause(torrentHashesToMove)
    await qbitAPI.resume(torrentHashesToMove)
  }
}
