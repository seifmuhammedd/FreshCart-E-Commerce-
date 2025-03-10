import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _HttpClient : HttpClient) { }

  registerUser( userData : object ) : Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup` , userData)
  }

  logInUser( userData : object ) : Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin` , userData )
  }
}
