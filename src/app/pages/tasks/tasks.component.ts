import { Component, OnInit } from '@angular/core';
import { TasksApiService } from '../../services/tasks-api';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  error = '';

  constructor(private api: TasksApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.api.list().subscribe({
      next: tasks => (this.tasks = tasks),
      error: () => (this.error = 'Error al cargar tareas'),
    });
  }

  remove(id: number) {
    this.api.remove(id).subscribe({
      next: () => this.load(),
      error: () => (this.error = 'Error al eliminar la tarea'),
    });
  }
}