import { Component } from '@angular/core';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  constructor(public tasksService: TasksService) {}

  remove(id: number) {
    this.tasksService.remove(id);
  }

  
}