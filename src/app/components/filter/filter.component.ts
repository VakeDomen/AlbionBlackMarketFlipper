import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FilterData } from 'src/app/models/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  @Output() scan = new EventEmitter<FilterData>();
  @Output() stopScan = new EventEmitter<void>();
  public filter: FilterData = new FilterData();
  public settingsOpen: boolean = false;
  public scanning: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  emitScan(): void {
    this.scanning = true;
    this.scan.emit(this.filter);
  }

  stopScannig(): void {
    this.scanning = false;
    this.stopScan.emit();
  }

  toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
  }
}
