import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private _HttpClient : HttpClient ) { }

  getAllProducts() : Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products`)
  }

  getProductDetails(id:string|null) : Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products/${id}`)
  }
}
