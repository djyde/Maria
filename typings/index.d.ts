declare interface Aria2File {
  /** The GID (or gid) is a key to manage each download. */
  gid: string,
  /** `active` for currently downloading/seeding downloads.
   * `waiting` for downloads in the queue; download is not started. 
   * `paused` for paused downloads.
   * `error` for downloads that were stopped because of error.
   * `complete` for stopped and completed downloads.
   * `removed` for the downloads removed by user. */
  status: Aria2TaskStatus,
  /** Total length of the download in bytes. */
  totalLength: string,
  /** Completed length of the download in bytes. */
  completedLength: string,
  /** Download speed of this download measured in bytes/sec. */
  downloadSpeed: string,
  errorCode?: Aria2ErrorCode,
  /** Directory to save files. */
  dir: string,
  files: {
    path: string
  }[]
}

declare type Aria2TaskStatus = 'active' | 'waiting' | 'paused' | 'error' | 'complete' | 'removed'

declare enum Aria2ErrorCode {
  SUCCESSFUL,
  UNKNOWN,
  TIMEOUT,
  NOT_FOUND,
  MAX_FILE_NOT_FOUND,
  ABROTED_TOO_SLOW,
  NETWORK_PROBLEM,
  FORCE_QUITE,
  RESUME_NOT_SUPPORT,
  DISK_SPACE_NOT_ENOUGH
}

declare interface IAria2Error {
  code: number,
  message: string
}

declare var global: any