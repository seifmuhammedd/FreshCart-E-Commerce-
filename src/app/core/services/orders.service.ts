import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private _HttpClient : HttpClient ) { }

  getUserOrders(userID : string) : Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/orders/user/${userID}`)
  }

}
