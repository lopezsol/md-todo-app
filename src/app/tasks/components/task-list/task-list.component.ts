import { Component, inject } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskStoreService } from '../../services/task-store.service';

@Component({
  selector: 'task-list',
  imports: [TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  taskStore = inject(TaskStoreService);
  tasks = this.taskStore.tasks;
}
