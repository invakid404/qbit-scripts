import {ToCamelCase} from './types'
import {encode} from './encoding'
import {toCamelCase} from './case'

export type TorrentListFilter = 'all' | 'downloading' | 'seeding' | 'completed' | 'paused' | 'active' | 'inactive' | 'resumed' | 'stalled' | 'stalled_uploading' | 'stalled_downloading' | 'errored'

export type GetTorrentListOptions = {
  filter?: TorrentListFilter
}

export type Torrent = ToCamelCase<{
  added_on: number
  amount_left: number
  auto_tmm: boolean
  availability: number
  category: string
  completed: number
  completion_on: number
  content_path: string
  dl_limit: number
  dlspeed: number
  downloaded: number
  downloaded_session: number
  eta: number
  f_l_piece_prio: boolean
  force_start: boolean
  hash: string
  last_activity: number
  magnet_uri: string
  max_ratio: number
  max_seeding_time: number
  name: string
  num_complete: number
  num_incomplete: number
  num_leechs: number
  num_seeds: number
  priority: number
  progress: number
  ratio: number
  ratio_limit: number
  save_path: string
  seeding_time: number
  seeding_time_limit: number
  seen_complete: number
  seq_dl: boolean
  size: number
  state: string
  super_seeding: boolean
  tags: string
  time_active: number
  total_size: number
  tracker: string
  up_limit: number
  uploaded: number
  uploaded_session: number
  upspeed: number
}>

export class QBittorrent {
  private readonly authHeader: string

  constructor(private readonly host: string, username: string, password: string)  {
    this.authHeader = `Basic ${encode([username, password].join(':'), 'base64')}`
  }

  async getTorrentList(options?: GetTorrentListOptions): Promise<Torrent[]> {
    return this.fetchAPI('/api/v2/torrents/info', {queryParams: options})
  }

  async moveToBottom(torrentHashes: string[]): Promise<void> {
    await this.fetchAPI('/api/v2/torrents/bottomPrio', {
      queryParams: {
        hashes: torrentHashes.join('|'),
      },
      returns: false,
    })
  }

  async pause(torrentHashes: string[]): Promise<void> {
    await this.fetchAPI('/api/v2/torrents/pause', {
      queryParams: {
        hashes: torrentHashes.join('|'),
      },
      returns: false,
    })
  }

  async resume(torrentHashes: string[]): Promise<void> {
    await this.fetchAPI('/api/v2/torrents/resume', {
      queryParams: {
        hashes: torrentHashes.join('|'),
      },
      returns: false,
    })
  }

  private async fetchAPI(path: string, options?: RequestInit & { queryParams?: Record<string, string>, returns?: boolean }): Promise<any> {
    const {queryParams, returns = true, ...rest}  = options ?? {}

    const url = new URL(path, this.host)
    queryParams && (url.search = Object.entries(queryParams).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&'))

    const response = await fetch(url.href, {
      ...rest,
      headers: {
        ...options?.headers,
        Authorization: this.authHeader,
      },
    })

    if (returns) {
      return response.json().then((data => toCamelCase(data)))
    }
  }
}
