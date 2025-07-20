import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth-success',
  imports: [],
  templateUrl: './oauth-success.component.html',
  styleUrl: './oauth-success.component.css'
})
export class OauthSuccessComponent {
  constructor(private router:Router, private route:ActivatedRoute){}
  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    console.log(token);
    
    if (token) {
      localStorage.setItem('token', token); 
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
