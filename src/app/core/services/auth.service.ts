import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _HttpClient : HttpClient) { }

  registerUser( userData : object ) : Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , userData)
  }

  logInUser( userData : object ) : Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , userData )
  }
}
