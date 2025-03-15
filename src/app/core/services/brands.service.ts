import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor( private _HttpClient : HttpClient ) { }

  getAllBrands() : Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/brands?limit=20`)
  }
}
