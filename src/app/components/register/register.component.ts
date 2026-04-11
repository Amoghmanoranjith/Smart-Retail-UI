import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private authService: RegisterService,
    private router: Router,
  ) {}
  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: (res) => {
        console.log('Register success', res);
        alert('Account created successfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed');
      },
    });
  }
}
