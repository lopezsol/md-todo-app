import {
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import type { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'task-card',
  imports: [LucideAngularModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
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
