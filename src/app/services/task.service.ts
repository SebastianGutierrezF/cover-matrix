import { Injectable, inject, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Task, QuadrantId, STORAGE_KEY } from '../models';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _tasks = signal<Task[]>([]);

  readonly inboxTasks = computed(() => this._tasks().filter(t => t.quadrant === 'inbox'));

  tasksByQuadrant(id: QuadrantId) {
    return computed(() => this._tasks().filter(t => t.quadrant === id));
  }

  constructor() {
    this.loadFromStorage();
  }

  addTask(text: string): void {
    if (!text.trim()) return;
    const task: Task = {
      id: crypto.randomUUID(),
      text: text.trim(),
      quadrant: 'inbox',
      createdAt: Date.now(),
    };
    this._tasks.update(tasks => [...tasks, task]);
    this.persist();
  }

  moveTask(taskId: string, target: QuadrantId): void {
    this._tasks.update(tasks =>
      tasks.map(t => t.id === taskId ? { ...t, quadrant: target } : t)
    );
    this.persist();
  }

  deleteTask(taskId: string): void {
    this._tasks.update(tasks => tasks.filter(t => t.id !== taskId));
    this.persist();
  }

  reorderTasks(quadrantId: QuadrantId, orderedIds: string[]): void {
    const otherTasks = this._tasks().filter(t => t.quadrant !== quadrantId);
    const reordered = orderedIds
      .map(id => this._tasks().find(t => t.id === id))
      .filter((t): t is Task => !!t);
    this._tasks.set([...otherTasks, ...reordered]);
    this.persist();
  }

  private persist(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks()));
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this._tasks.set(JSON.parse(raw) as Task[]);
    } catch {
      this._tasks.set([]);
    }
  }
}
