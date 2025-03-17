import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _HttpClient : HttpClient) { }
  decodedInfo:any

  registerUser( userData : object ) : Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup` , userData)
  }

  logInUser( userData : object ) : Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin` , userData )
  }

  getDecodedInfo() : void {
    if(sessionStorage.getItem('token') != null){
      this.decodedInfo = jwtDecode(sessionStorage.getItem('token') !)
    }
  }

}
