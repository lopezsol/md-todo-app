import { Component, computed, inject, input } from '@angular/core';
import type { Task } from '../../interfaces/task.interface';
import { TaskStoreService } from '../../services/task-store.service';
import { LucideAngularModule, Trash2 } from 'lucide-angular';

@Component({
  selector: 'task-card',
  imports: [LucideAngularModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  taskStore = inject(TaskStoreService);
  readonly TrashIcon = Trash2;

  task = input.required<Task>();
  isCompleted = computed(() => this.task().completed);

  onDelete(id: string) {
    this.taskStore.deleteTask(id);
  }
  onToggleComplete(task: Task) {
    this.taskStore.toggleComplete(task);
  }
}
