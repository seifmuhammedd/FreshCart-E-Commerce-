import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor( private _HttpClient : HttpClient ) { }

  clientToken : any = { token : sessionStorage.getItem("token") }

  createCheckOutSession( cartID:string|null, shippingData:object ) : Observable<any>{
    return this._HttpClient.post(
      `${environment.baseURL}/api/v1/orders/checkout-session/${cartID}?url=${environment.url}`,
      {
        "shippingAddress" : shippingData
      },
      {
        headers : this.clientToken
      }
    )
  } 

  

}
