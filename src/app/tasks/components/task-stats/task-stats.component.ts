import { Component, computed, inject, input } from '@angular/core';
import type { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'task-stats',
  imports: [],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.css',
})
export class TaskStatsComponent {
  tasks = input.required<Task[]>();

  totalTasks = computed(() => this.tasks().length);
  completedTasks = computed(
    () => this.tasks().filter((task) => task.completed).length
  );
  pendingTasks = computed(() => this.totalTasks() - this.completedTasks());
}
