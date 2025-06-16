import {
  Component,
  computed,
  inject,
  input,
  output,
 
} from '@angular/core';
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

  deletedTask = output<string>();
  updatedTask = output<Task>();

  onDelete(id: string) {
    this.deletedTask.emit(id);
  }
  onToggleCompleted(task: Task) {
    this.updatedTask.emit(task);
  }
}
