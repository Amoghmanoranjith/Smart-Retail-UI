import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginData = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService,
    private router:Router
  ) {}

  onLogin() {
    this.loginService.login(this.loginData).subscribe({
      next: (res) => {
        console.log('Login success', res);
        
        // store token (later JWT)
        localStorage.setItem('token', res);

        // redirect (we’ll add later)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Invalid credentials');
      }
    });
  }
}
