import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private api:ApiService, private router:Router){}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })

  login(){
    const {email, password} = this.loginForm.value
    if(this.loginForm.valid){
      this.api.loginUserApi({email,password}).subscribe({
        next:(res:any)=>{
          sessionStorage.setItem("user",JSON.stringify(res.user))
          sessionStorage.setItem("token",res.token)
          this.router.navigateByUrl('/')
          this.loginForm.reset()
        },error:(reason:any)=>{
          alert(reason.error)
        }
      })
    }else{
      alert("Form is not valid")
    }
  }

  signinGoogle(){
    window.location.href = 'http://localhost:5000/auth/google'; 
  }
}
