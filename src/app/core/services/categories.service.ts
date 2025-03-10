import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private _HttpClient : HttpClient ) { }

  getALLCategories() : Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/categories`)
  }
}
