import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadTableData } from '../download-table-data';

import { DownloadTableComponent } from './download-table.component';

describe('DownloadTableComponent', () => {
  let component: DownloadTableComponent;
  let fixture: ComponentFixture<DownloadTableComponent>;

  const TEST_DATA: DownloadTableData[] = [
    {name: 'smss.exe', device: 'Mario', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe', status: 'scheduled'},
    {name: 'netsh.exe', device: 'Luigi', path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe', status: 'available'},
    {name: 'uxtheme.dll', device: 'Peach', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll', status: 'available'},
    {name: 'aries.sys', device: 'Daisy', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys', status: 'scheduled'},
    {name: 'cryptbase.dll', device: 'Yoshi', path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll', status: 'scheduled'},
    {name: '7za.exe', device: 'Toad', path: '\\Device\\HarddiskVolume1\\temp\\7za.exe', status: 'scheduled'}
  ];

  const EMPTY_DATA: DownloadTableData[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTableComponent);
    component = fixture.componentInstance;
    component.files = TEST_DATA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onFileSelected', () => {
    it('should add or remove index from set when user selects a file', () => {
      expect(component.files.length).toBe(TEST_DATA.length);
      expect(component.selectedFileIds.size).toBe(0);

      component.onFileSelected(0);
      expect(component.selectedFileIds.size).toBe(1);

      component.onFileSelected(1);
      expect(component.selectedFileIds.size).toBe(2);

      component.onFileSelected(1);
      expect(component.selectedFileIds.size).toBe(1);

      component.onFileSelected(0);
      expect(component.selectedFileIds.size).toBe(0);
    });
  });

  describe('isFileSelected', () => {
    it('should check if a file is selected', () => {
      expect(component.files.length).toBe(TEST_DATA.length);
      expect(component.selectedFileIds.size).toBe(0);

      expect(component.isFileSelected(0)).toBeFalse();
      component.onFileSelected(0);
      expect(component.isFileSelected(0)).toBeTrue();

      component.onFileSelected(0);
      expect(component.isFileSelected(0)).toBeFalse();
    });
  });

  describe('getSelectedAvailableFiles', () => {
    it('should get all available and selected files', () => {
      expect(component.files.length).toBe(TEST_DATA.length);
      expect(component.selectedFileIds.size).toBe(0);

      expect(component.getSelectedAvailableFiles().length).toBe(0);
      component.onFileSelected(0);
      expect(component.getSelectedAvailableFiles().length).toBe(0);

      component.onFileSelected(1);
      expect(component.getSelectedAvailableFiles().length).toBe(1);

      component.onFileSelected(1);
      expect(component.getSelectedAvailableFiles().length).toBe(0);
    });
  });

  describe('selectAllFiles', () => {
    it('should select all files if less than all are selected, otherwise deselect all', () => {
      expect(component.files.length).toBe(TEST_DATA.length);
      expect(component.selectedFileIds.size).toBe(0);

      component.selectAllFiles();
      expect(component.selectedFileIds.size).toBe(TEST_DATA.length);

      component.selectAllFiles();
      expect(component.selectedFileIds.size).toBe(0);

      component.onFileSelected(0);
      component.selectAllFiles();
      expect(component.selectedFileIds.size).toBe(TEST_DATA.length);

      component.selectAllFiles();
      expect(component.selectedFileIds.size).toBe(0);
      component.files.forEach((_, i) => component.onFileSelected(i));
      expect(component.selectedFileIds.size).toBe(TEST_DATA.length);
      component.selectAllFiles();
      expect(component.selectedFileIds.size).toBe(0);
    });
  });
});
