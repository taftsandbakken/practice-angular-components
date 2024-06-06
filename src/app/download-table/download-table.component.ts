import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DownloadTableData, DownloadStatus } from '../download-table-data';

@Component({
  selector: 'app-download-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-table.component.html',
  styleUrl: './download-table.component.scss'
})
export class DownloadTableComponent {
  @Input() files!: DownloadTableData[];
  @Input() useNarrowStyles!: boolean;

  public readonly AVAILABLE_STATUS: DownloadStatus = 'available';

  public selectedFileIds: Set<number> = new Set<number>();
  public showDownloadModal = false;

  public onFileSelected(index: number) {
    if (this.isFileSelected(index))
      this.selectedFileIds.delete(index);
    else
      this.selectedFileIds.add(index);
  }

  public isFileSelected(index: number): boolean {
    return this.selectedFileIds.has(index);
  }

  public getSelectedAvailableFiles(): DownloadTableData[] {
    return this.files.filter((file, index) => this.isFileSelected(index) && file.status === this.AVAILABLE_STATUS);
  }

  public selectAllFiles() {
    if (this.selectedFileIds.size === this.files.length)
      this.selectedFileIds.clear();
    else
      this.files.forEach((_, index) => this.selectedFileIds.add(index));
  }
}
