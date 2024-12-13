import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm : FormGroup = new FormGroup({
    name : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(14)]),
    email : new FormControl(null , [Validators.required , Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword : new FormControl(null),
    phone : new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , this.comparePassword)  

  comparePassword (g : AbstractControl):(null|object){
    if (g.get("password")?.value === g.get("rePassword")?.value){
      return null
    }else{
      return {'missmatch':true}
    }
  }

  registerUser():void{
    console.log(this.registerForm)
  }

}
