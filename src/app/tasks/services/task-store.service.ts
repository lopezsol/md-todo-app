import { computed, inject, Injectable, signal } from '@angular/core';
import type { Task } from '../interfaces/task.interface';
import { TaskService } from './task.service';
import { CreateTaskDto } from '../interfaces/create-task-dto.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  private taskService = inject(TaskService);

  private _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  readonly totalTasks = computed(() => this._tasks().length);
  readonly completedTasks = computed(
    () => this._tasks().filter((task) => task.completed).length
  );
  readonly pendingTasks = computed(
    () => this.totalTasks() - this.completedTasks()
  );

  fetchTasks() {
    this.taskService.findAllTasks().subscribe((tasks) => {
      this._tasks.set(tasks);
    });
  }

  addTask(title: string) {
    const newTask: CreateTaskDto = {
      title,
      completed: false,
    };
    // this.taskService.addTask(newTask).subscribe(() => this.fetchTasks());
    //TODO: preguntar cual es mejor opcion
    this.taskService
      .addTask(newTask)
      .subscribe((task) => this._tasks.update((tasks) => [...tasks, task]));
  }

  deleteTask(id: string) {
    // this.taskService.deleteTask(id).subscribe(() => this.fetchTasks());

    //TODO: preguntar cual es mejor opcion
    id = '1234';
    this.taskService
      .deleteTask(id)
      .subscribe(() =>
        this._tasks.update((tasks) => tasks.filter((task) => task.id !== id))
      );
  }

  toggleCompleted(task: Task) {
    const { id, completed } = task;

    this.taskService
      .updateTask(id, { completed: !completed })
      .subscribe((taskResponse) =>
        this._tasks.update((tasks) =>
          tasks.map((t) => (t.id === id ? taskResponse : t))
        )
      );
    //TODO: preguntar cual es mejor opcion

    // this.taskService
    //   .updateTask(id, { completed: !completed })
    //   .subscribe(() => this.fetchTasks());
  }
}
