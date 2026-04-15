import { Component, Input, inject } from '@angular/core';
import { Task } from '../../models';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input({ required: true }) task!: Task;

  private taskService = inject(TaskService);

  delete(event: MouseEvent): void {
    event.stopPropagation();
    this.taskService.deleteTask(this.task.id);
  }
}
