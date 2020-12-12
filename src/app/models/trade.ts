import { FilterData } from './filter';

export class Trade {
    itemName: string;
    itemTier: number;
    itemEnchantment: number;
    itemQuality: number;
    from: string;
    buy: number;
    sell: number;
    BMage: Date;
    cityage: Date;
    filter: FilterData;

    private floatingDecimalPercision = 3;

    constructor(itemName: string, itemTier: number, itemEnchantment: number, itemQuality: number, from: string, buy: number, sell: number, BMage: Date, cityage: Date, filter: FilterData) {
        this.itemName = itemName;
        this.itemTier = itemTier;
        this.itemEnchantment = itemEnchantment;
        this.itemQuality = itemQuality;
        this.from = from;
        this.buy = buy;
        this.sell = sell;
        this.BMage = BMage;
        this.cityage = cityage;
        this.filter = filter;
    }

    isProfitable(): boolean {
        return this.getProfit() >= 0;
    }

    ifAlowed(): boolean {
        return this.buy !== 0 &&
            this.sell !== 0 &&
            !this.isOutdated() &&
            this.getProfit() >= this.filter.minprofit &&
            this.getProfitPercentage() <= this.filter.maxPercentProfit &&
            this.getProfitPercentage() >= this.filter.minPercentProfit;

    }
    
    getProfit(): number {
        return this.sum(this.sum(this.sell, -this.mult(this.sell, this.getTax())), -this.buy);
    }

    getProfitPercentage(): number {
        return this.mult(this.div(this.getProfit(), this.buy), 100);
    }

    isOutdated(): boolean {
        return ((new Date().getTime() - this.BMage.getTime()) / (60 * 1000) - 60) > (this.filter.maxBMage) ||
            ((new Date().getTime() - this.cityage.getTime()) / (60 * 1000) - 60) > (this.filter.maxMarketAge);
    }

    private getTax(): number {
        return this.filter.premium ? 0.015 : 0.06;
    }

    private sum(num1: number, num2: number): number {
        if (+num1 + +num2 === 0) {
          return 0;
        }
        return +(+num1 + +num2).toFixed(this.floatingDecimalPercision);
    }
    
    private mult(num1: number, num2: number): number {
        if (+num1 * +num2 === 0) {
            return 0;
        }
        return +(+num1 * +num2).toFixed(this.floatingDecimalPercision);
    }

    private div(num1: number, num2: number): number {
        if (+num1 * +num2 === 0) {
          return 0;
        }
        return +(+num1 / +num2).toFixed(this.floatingDecimalPercision);
      }
}