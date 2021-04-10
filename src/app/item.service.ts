import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item, ItemResponse, ItemStatus} from './create-item/create-item.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  API = 'http://localhost:8080/items';

  // Comunicarea intre front end si backend se face prin Http
  // httpClient este injectat
  constructor(private httpClient: HttpClient) { }

  createItem(item: Item): Observable<any> {
    return this.httpClient.post(this.API, item);
  }

  getAll(): Observable<ItemResponse[]> {
    return this.httpClient.get<ItemResponse[]>(this.API);
  }

  // http://localhost:8080/items/7
  updateStatus(id: number, status: ItemStatus): Observable<ItemResponse> {
    return this.httpClient.put<ItemResponse>(this.API + '/' + id, {itemStatus: status});
  }

  deleteItem(id: number): Observable<any> {
    return this.httpClient.delete(this.API + '/' + id);
  }
}
