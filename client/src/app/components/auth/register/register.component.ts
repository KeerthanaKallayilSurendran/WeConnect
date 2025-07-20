import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private api:ApiService, private router:Router){}
 
  userForm:FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.maxLength(30)]),
    email: new FormControl("",[Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*\\d)(?=.*[A-Z])(?=.*[@#$&*!])[a-zA-Z\\d@#$&*!]{8,16}$")]),
  })
  
  register(){
    if(this.userForm.valid){
      const username = this.userForm.value.username
      const email = this.userForm.value.email
      const password = this.userForm.value.password
      
      this.api.registerUserApi({username,email,password}).subscribe({
        next:(res:any)=>{
          alert(`Welcome, Please login to explore weconnect`)
          this.router.navigateByUrl('/login')
          this.userForm.reset()
        },error:(reason:any)=>{
          console.log(reason);
          alert(reason)
          this.userForm.reset
        }
      })
    }else{
      alert("Form is invalid")
    }
    
  }

}
