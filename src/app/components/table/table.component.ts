import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { Trade } from 'src/app/models/trade';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnChanges {

  @Input() trades: Trade[] = [];
  @Input() scanning: boolean = false;

  constructor() { }

  ngOnChanges(): void {

  }

  getQualityLabel(quality: number): string {
    switch (quality) {
      case 1:
        return 'Normal'
      case 2:
        return 'Good'
      case 3:
        return 'Outstanding'
      case 4:
        return 'Excellent'
      case 5:
        return 'Masterpiece'
      default:
        return '';
    }
  }

  sortByProfit(trades: Trade[]): Trade[] {
    return trades.sort((a,b) => (a.getProfit() > b.getProfit() ? -1 : ((b.getProfit() > a.getProfit()) ? 1 : 0)));
  }

  copyToClipboard(item: any): void {
    const copy = (e: ClipboardEvent) => {
      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', (item));
        e.preventDefault();
      }
    }
    document.addEventListener('copy', copy);
    document.execCommand('copy');
    document.removeEventListener('copy', copy);
  }


}
