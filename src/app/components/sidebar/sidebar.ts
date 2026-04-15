import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Task, QuadrantId } from '../../models';
import { TaskService } from '../../services/task.service';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FormsModule, DragDropModule, TaskCard],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private taskService = inject(TaskService);

  readonly inboxTasks = this.taskService.inboxTasks;
  newTaskText = '';

  addTask(): void {
    this.taskService.addTask(this.newTaskText);
    this.newTaskText = '';
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.addTask();
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer !== event.container) {
      const task = event.item.data as Task;
      this.taskService.moveTask(task.id, 'inbox');
    }
  }
}
