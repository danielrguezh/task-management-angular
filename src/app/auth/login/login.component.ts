import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,        // ← NECESARIO para *ngIf
    ReactiveFormsModule  // ← NECESARIO para formGroup
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  save() {
    if (this.form.invalid || this.loading) return;

    this.loading = true;
    this.error = null;

    const { username, password } = this.form.value;

    this.auth.login(username, password).subscribe({
      next: () => this.router.navigate(['/tareas']),
      error: () => {
        this.error = 'Credenciales inválidas';
        this.loading = false;
      }
    });
  }
}
