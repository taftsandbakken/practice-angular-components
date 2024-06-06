export type DownloadStatus = 'scheduled'|'available';

export interface DownloadTableData {
  name: string;
  device: string;
  path: string;
  status: DownloadStatus
}
