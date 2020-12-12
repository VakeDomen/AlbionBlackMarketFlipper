import { Component, OnInit } from '@angular/core';
import { FilterData } from 'src/app/models/filter';
import { ItemData } from 'src/app/models/item';
import { Trade } from 'src/app/models/trade';
import { AlbionService } from 'src/app/services/albion.service';
import { itemNames } from '../../services/names';

type ItemDS = {
  [item_id: string]: ItemTier;
}

type ItemTier = {
  [enchantment: number]: Item;
}

type Item = {
  name: string;
  quality: {
    [quality: number]: {
      bmPrice: number;
      bmAge: Date;
      cities: {
        [city: string]: Price;
      }
    }
  }
}

type Price = {
  price: number;
  age: Date;
}



@Component({
  selector: 'app-flipper',
  templateUrl: './flipper.component.html',
  styleUrls: ['./flipper.component.sass']
})
export class FlipperComponent implements OnInit {

  private names: any = [];
  
  public scanning: boolean = false;
  public shouldScan: boolean = false;
  public trades: Trade[] = [];

  constructor(private albion: AlbionService) { }

  ngOnInit(): void {
    this.initiateNames();
  }

  initiateNames(): void {
    itemNames.split(';').forEach((itemNaming: string) => {
      const nameData = itemNaming.split(':');
      if (!this.names[nameData[0]]) {
        this.names[nameData[0]] = [];
      }
      this.names[nameData[0]][Number(nameData[1])] = nameData[2];
    });
  }

  initiateScan(filter: FilterData): void {
    this.shouldScan = true;
    this.scan(filter);
  }

  stopScannig(): void {
    this.shouldScan = false;
  }


  async scan(filter: FilterData): Promise<void> {
    console.log("Intiating scan...");
    this.scanning = true;
    const items: ItemData[] = await this.getData(filter);
    console.log(items)
    const itemCache: ItemDS = this.sortRetrievedItems(items);
    const tradableItems: Trade[] = this.findProfitableTrades(itemCache, filter);
    this.trades = tradableItems;
    this.scanning = false;
    if (this.shouldScan) {
      setTimeout(()=> { this.scan(filter) }, 10 * 1000);
    }
  }

  private findProfitableTrades(itemCache: ItemDS, filter: FilterData): Trade[] {
    const trades: Trade[] = [];
    Object.keys(itemCache).forEach((itemTierId: string) => {
      let tradable = false;
      Object.keys(itemCache[itemTierId]).forEach((ie: string) => {
        const itemEnchantment = Number(ie);
        const item: Item = itemCache[itemTierId][Number(itemEnchantment)];
        Object.keys(item.quality).forEach((q: string) => {
          const quality = Number(q);
          Object.keys(item.quality[quality].cities).forEach((city: string) => {
            const trade = new Trade(
              item.name, 
              this.extractTier(itemTierId),
              itemEnchantment, 
              quality, 
              city, 
              item.quality[quality].cities[city].price, 
              item.quality[quality].bmPrice,
              item.quality[quality].bmAge,
              item.quality[quality].cities[city].age,
              filter
            );
            if (trade.isProfitable() && trade.ifAlowed()) {
              trades.push(trade);
            }
          });
        });
      });
    });
    
    console.log(trades)
    return trades;
  }

  private sortRetrievedItems(items: ItemData[]): ItemDS {
    
    let itemCache: ItemDS = {};
    items.forEach((item: ItemData) => {
      if (!itemCache[item.item_id]) {
        itemCache[item.item_id] = [];
      }
      if (!itemCache[item.item_id][this.extractEnchant(item.item_id)]) {
        itemCache[item.item_id][this.extractEnchant(item.item_id)] = { name: '', quality: { }};
      }
      itemCache[item.item_id][this.extractEnchant(item.item_id)].name = this.names[this.removeEnchant(item.item_id)][this.extractEnchant(item.item_id)];
      if (!itemCache[item.item_id][this.extractEnchant(item.item_id)].quality[item.quality]) {
        itemCache[item.item_id][this.extractEnchant(item.item_id)].quality[item.quality] = {bmPrice: 0, bmAge: new Date(-8640000000000000), cities: {}};
      }
      if (item.city === 'Black Market') {
        itemCache[item.item_id][this.extractEnchant(item.item_id)].quality[item.quality].bmPrice = item.buy_price_max;
        itemCache[item.item_id][this.extractEnchant(item.item_id)].quality[item.quality].bmAge = new Date(item.buy_price_max_date);

      } else {
        itemCache[item.item_id][this.extractEnchant(item.item_id)].quality[item.quality].cities[item.city] = {
          age: new Date(item.sell_price_min_date),
          price: item.sell_price_min
        };
      }
    });  
    return itemCache;
  }

  private extractTier(itemId: string): number {
    return Number(itemId.split('T')[1].charAt(0));
  }

  private removeEnchant(itemId: string): string {
    return itemId.split('@')[0];
  }

  private extractEnchant(itemId: string): number {
    const ench = itemId.split('@')[1];
    return ench ? Number(ench) : 0;
  }

  private async getData(filter:FilterData): Promise<ItemData[]> {
    const requests: Promise<ItemData[]>[] = [];
    for (const tier of Object.keys(filter.tier)) {
      for (const enchantment of Object.keys(filter.enchantment)) {
        if (!!filter.tier[tier] && !!filter.enchantment[enchantment]) {
          const t = Number(tier.split('T')[1]);
          const e = Number(enchantment.split('E')[1]);
          requests.push(this.albion.getBMGear(t, e, filter).toPromise());
        }
      }
    }
    let data = await Promise.all(requests);
    return data.reduce((accumulator: ItemData[], data: ItemData[]) => {
      return accumulator.concat(data);
    }, []);
  }
}
