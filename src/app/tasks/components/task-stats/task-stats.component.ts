import { Component, computed, inject, input } from '@angular/core';
import { TaskStoreService } from '../../services/task-store.service';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'task-stats',
  imports: [],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.css',
})
export class TaskStatsComponent {
  taskStore = inject(TaskStoreService);
  tasks = input.required<Task[]>();

  // totalTasks = this.taskStore.totalTasks;
  // completedTasks = this.taskStore.completedTasks;
  // pendingTasks = this.taskStore.pendingTasks;

  totalTasks = computed(() => this.tasks().length);
  completedTasks = computed(
    () => this.tasks().filter((task) => task.completed).length
  );
  pendingTasks = computed(() => this.totalTasks() - this.completedTasks());
}
