import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyOtpComponent } from './components/auth/verify-otp/verify-otp.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { OauthSuccessComponent } from './components/auth/oauth-success/oauth-success.component';

export const routes: Routes = [
    {
        path:'login',
        component: LoginComponent,
        title: "Login"
    },
    {
        path:'register',
        component: RegisterComponent,
        title:"Register"
    },
    {
        path:'forgot-password',
        component:ForgotPasswordComponent,
        title:"Forgot Password"
    },
    {
        path: 'verify-otp',
        component:VerifyOtpComponent,
        title: "Verify OTP"
    },
    {
        path:'reset-password',
        component:ResetPasswordComponent,
        title:'Reset Password'
    },
    {
        path:'oaut-success',
        component:OauthSuccessComponent,
        title:'OAuth Success'
    }
];
