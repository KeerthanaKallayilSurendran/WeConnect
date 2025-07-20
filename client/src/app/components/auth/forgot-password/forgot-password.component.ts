import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email:string = ""
  constructor(private api:ApiService, private router:Router){}

  sendOtp(){
    if(!this.email){
      alert("Enter a valid email")
    }
    const userDetails = {email: this.email}
    this.api.forgotPasswordApi(userDetails).subscribe({
      next:(res:any)=>{
        this.router.navigateByUrl('/verify-otp')
      },error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }

}
