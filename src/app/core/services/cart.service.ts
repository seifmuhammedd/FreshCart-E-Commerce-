import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private _HttpClient : HttpClient ) { }

  // clientToken : any = { token : sessionStorage.getItem("token") }
  cartCounter : BehaviorSubject<number> = new BehaviorSubject(0) 
  
  getLoggedUserCart() : Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/cart`)
  }

  addItemToCart(productId : string) : Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/cart` , {"productId" : productId})
  }

  removeItemFromCart(productId : string) : Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart/${productId}`)
  }

  clearCart() : Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/cart`)
  }

  updateItemQuantitiy(productId : string , count : number) : Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/cart/${productId}` , {"count" : count})
  }

}
