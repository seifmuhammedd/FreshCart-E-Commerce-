import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  constructor ( private _FormBuilder :FormBuilder , private _AuthService : AuthService , private _Router : Router ) {}
  
  loading:boolean = false
  responseText!:string
  registerSub !: Subscription

  registerForm : FormGroup = this._FormBuilder.group({
    name :[null , [Validators.required , Validators.minLength(3) , Validators.maxLength(14)]],
    email :[null , [Validators.required , Validators.email]],
    password :[null , [Validators.required , Validators.pattern(/^\w{6,}$/)]],
    rePassword :[null],
    phone :[null , [Validators.required , Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]]
  } , {validators : this.comparePassword})  

  comparePassword (g : AbstractControl):(null|object){
    if (g.get("password")?.value === g.get("rePassword")?.value){
      return null
    }else{
      return {'missMatch':true}
    }
  }

  registerData():void{
    if(this.registerForm.valid){
      this.loading=true
      this.registerSub = this._AuthService.registerUser(this.registerForm.value).subscribe({
        next : ( res ) => {
          this.responseText = res.message
          this.loading = false
          setInterval( () => {
            this._Router.navigate([ "/auth/login" ])
          } , 2000)
        },
        error : ( error ) => {
          this.responseText = error.error.message
          this.loading = false
        }
      })
    }else{
      this.registerForm.setErrors({missMatch:true})
      this.registerForm.markAllAsTouched()
    }
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe()
  }

}
