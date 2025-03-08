import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor( private _FormBuilder:FormBuilder , private _AuthService : AuthService , private _Router : Router ){}
  
  loading : boolean = false
  responseText !: string
  
  logInForm : FormGroup = this._FormBuilder.group({
    email : [null , [Validators.required , Validators.email]],
    password : [null , [Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]]
  })
  
    logInData():void{
      if(this.logInForm.valid){
        this.loading=true
        this._AuthService.logInUser(this.logInForm.value).subscribe({
          next : ( res ) => {
            this.loading = false
            this.responseText = res.message
            setTimeout( () => {
              this.loading = false
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
}
