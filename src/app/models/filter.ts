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
    maxBMAge: number;

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
            T4: true,
            T5: true,
            T6: true,
            T7: true,
            T8: true,
        }
        this.enchantment = {
            E0: true,
            E1: true,
            E2: true,
            E3: true,
        };
        this.premium = true;
        this.minprofit = 5000;
        this.maxBMAge = 30;
    }
}