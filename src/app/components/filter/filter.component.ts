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

  constructor() { }

  ngOnInit(): void {
  }

  emitScan(): void {
    this.scan.emit(this.filter);
  }

  stopScannig(): void {
    this.stopScan.emit();
  }
}
