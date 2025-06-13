import { Component, inject } from '@angular/core';
import { TaskStoreService } from '../../services/task-store.service';

@Component({
  selector: 'task-stats',
  imports: [],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.css',
})
export class TaskStatsComponent {
  taskStore = inject(TaskStoreService);
  totalTasks = this.taskStore.totalTasks;
  completedTasks = this.taskStore.completedTasks;
  pendingTasks = this.taskStore.pendingTasks;
}
