import { Component, inject } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskStoreService } from '../../services/task-store.service';

@Component({
  selector: 'task-page',
  imports: [TaskListComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent {
  taskStore = inject(TaskStoreService);

  ngOnInit() {
    this.taskStore.loadTasks();
  }
}
