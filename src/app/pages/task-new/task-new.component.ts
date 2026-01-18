import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksApiService } from '../../services/tasks-api';

@Component({
  selector: 'app-task-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-new.component.html',
  styleUrl: './task-new.component.css',
})
export class TaskNewComponent {
  private fb = inject(FormBuilder);
  private api = inject(TasksApiService);
  private router = inject(Router);

  error = '';

  form = this.fb.nonNullable.group({
    titulo: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    descripcion: this.fb.nonNullable.control('', [Validators.minLength(5)]),
    completada: this.fb.nonNullable.control(false),
  });

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.api.create(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/tareas'),
      error: () => (this.error = 'Error al crear la tarea'),
    });
  }

  cancel() {
    this.router.navigateByUrl('/tareas');
  }
}
