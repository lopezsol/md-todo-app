import { Component, inject } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskStoreService } from '../../services/task-store.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskStatsComponent } from '../../components/task-stats/task-stats.component';

@Component({
  selector: 'task-page',
  imports: [TaskListComponent, TaskFormComponent, TaskStatsComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent {
  taskStore = inject(TaskStoreService);

  ngOnInit() {
    this.taskStore.fetchTasks();
  }
}
