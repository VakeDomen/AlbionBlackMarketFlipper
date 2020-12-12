export class FilterData {
    city: {
        carleon: boolean,
        bridgewatch: boolean,
        martlock: boolean,
        fortstriling: boolean,
        thetford: boolean,
        lymhurst: boolean
    };
    tier: {
        [key: string]: boolean
    };
    enchantment: {
        [key: string]: boolean
    };
    premium: boolean;
    minprofit: number;
    minPercentProfit: number;
    maxPercentProfit: number;
    refreshTimer: number;
    maxBMage: number;
    maxMarketAge: number;


    constructor() {
        this.city = {
            carleon: true,
            bridgewatch: false,
            martlock: false,
            fortstriling: false,
            thetford: false,
            lymhurst: false,
        };
        this.tier = {
            T4: false,
            T5: true,
            T6: true,
            T7: true,
            T8: false,
        }
        this.enchantment = {
            E0: true,
            E1: true,
            E2: true,
            E3: true,
        };
        this.premium = false;
        this.minprofit = 5000;
        this.minPercentProfit = 5;
        this.maxPercentProfit = 200;
        this.refreshTimer = 5;
        this.maxBMage = 20;
        this.maxMarketAge = 20;
    }
}