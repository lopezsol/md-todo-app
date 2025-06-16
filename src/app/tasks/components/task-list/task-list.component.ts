import { Component, inject, input, output } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskStoreService } from '../../services/task-store.service';
import { TaskListEmptyComponent } from '../task-list-empty/task-list-empty.component';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'task-list',
  imports: [TaskCardComponent, TaskListEmptyComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  taskStore = inject(TaskStoreService);
  // tasks = this.taskStore.tasks;
  tasks = input.required<Task[]>();

  deletedTask = output<string>();
  updatedTask = output<Task>();

  onDelete(id: string) {
    this.deletedTask.emit(id);
  }
  onToggleCompleted(task: Task) {
    this.updatedTask.emit(task);
  }
}
