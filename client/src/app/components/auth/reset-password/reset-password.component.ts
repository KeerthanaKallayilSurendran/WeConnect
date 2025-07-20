import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm:FormGroup = new FormGroup({
    email: new FormControl("",Validators.required),
    password: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$&*!])[a-zA-Z\\d@#$&*!]{8,16}$")])
  })

  constructor(private api:ApiService, private router:Router){}

  resetPassword(){
    if(!this.resetForm.valid){
      alert("Enter the email and new password")
    }

    const {email, password} = this.resetForm.value

    this.api.resetPasswordApi({email,password}).subscribe({
      next:(res:any)=>{
        this.router.navigateByUrl('/login')
      },error:(reason:any)=>{
        console.log(reason.error);
      }
    })

  }
}
