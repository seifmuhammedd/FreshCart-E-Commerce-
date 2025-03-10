import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  constructor( private _FormBuilder:FormBuilder , private _AuthService : AuthService , private _Router : Router ){}
  
  loading : boolean = false
  responseText !: string
  loginSub !: Subscription

  logInForm : FormGroup = this._FormBuilder.group({
    email : [null , [Validators.required , Validators.email]],
    password : [null , [Validators.required , Validators.pattern(/^\w{6,}$/)]]
  })
  
    logInData():void{
      if(this.logInForm.valid){
        this.loading=true
        this.loginSub = this._AuthService.logInUser(this.logInForm.value).subscribe({
          next : ( res ) => {
            this.loading = false
            this.responseText = res.message
            setTimeout( () => {
              this._Router.navigate([ "/main/home" ])
            } , 2000)
            sessionStorage.setItem( "token" , res.token )
          },
          error : ( error ) => {
            this.loading = false
            this.responseText = error.error.message
          }
        })
      }else{
        this.logInForm.markAllAsTouched()
      }
    }

    ngOnDestroy(): void {
      this.loginSub?.unsubscribe()
    }
}
