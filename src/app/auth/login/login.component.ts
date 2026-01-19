import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
  this.error = null;

  this.auth.login(this.username, this.password).subscribe({
    next: () => this.router.navigate(['/tareas']),
    error: () => this.error = 'Credenciales inválidas'
  });
}
}