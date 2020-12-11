import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { urls } from './urls';
import { Observable } from 'rxjs';
import { FilterData } from '../models/filter';
import { ItemData } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class AlbionService {
  
  constructor(private http: HttpClient) { }

  getBMGear(tier: number, enchantment: number, filter: FilterData): Observable<ItemData[]> {
    return this.http.get<ItemData[]>(`${this.setTier(urls[enchantment], tier)}?${this.getLocations(filter)}`);
  }

  private getLocations(filter: FilterData): string {
    const locations: string[] = ['Black%20Market'];
    if (filter.city.bridgewatch) locations.push('Bridgewarch');
    if (filter.city.fortstriling) locations.push('Fort%20Sterling');
    if (filter.city.thetford) locations.push('Thetford');
    if (filter.city.lymhurst) locations.push('Lymhurst');
    if (filter.city.martlock) locations.push('Martlock');
    if (filter.city.carleon) locations.push('Caerleon');
    return `locations=${locations.join(',')}`;
  }

  private setTier(req: string, tier: number): string {
    return req.split('T???').join(`T${tier}`);
  }
}
