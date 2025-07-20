import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {
  verifyForm:FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    otp: new FormControl("", Validators.required)
  })

  constructor(private api:ApiService, private router:Router){}

  verifyOtp(){
    if(!this.verifyForm.valid){
      alert("Enter the email and otp")
    }
    const {email, otp} = this.verifyForm.value
    this.api.verifyOtpApi({email,otp}).subscribe({
      next:(res:any)=>{
        this.router.navigateByUrl('/reset-password')
      },error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }
}
