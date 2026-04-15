import { Component, Input, OnInit, inject, Signal } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuadrantConfig, QuadrantId, Task } from '../../models';
import { TaskService } from '../../services/task.service';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-quadrant',
  standalone: true,
  imports: [DragDropModule, TaskCard],
  templateUrl: './quadrant.html',
  styleUrl: './quadrant.scss',
})
export class Quadrant implements OnInit {
  @Input({ required: true }) config!: QuadrantConfig;

  private taskService = inject(TaskService);

  quadrantTasks!: Signal<Task[]>;

  readonly connectedTo: QuadrantId[] = ['inbox', 'do', 'plan', 'delegate', 'remove'];

  ngOnInit(): void {
    this.quadrantTasks = this.taskService.tasksByQuadrant(this.config.id);
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    const droppedTask = event.item.data as Task;

    if (event.previousContainer === event.container) {
      const ids = this.quadrantTasks().map(t => t.id);
      moveItemInArray(ids, event.previousIndex, event.currentIndex);
      this.taskService.reorderTasks(this.config.id, ids);
    } else {
      this.taskService.moveTask(droppedTask.id, this.config.id);
    }
  }
}
