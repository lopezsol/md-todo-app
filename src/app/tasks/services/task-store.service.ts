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
    this.taskService.findAll().subscribe((tasks) => {
      this._tasks.set(tasks);
    });
  }

  addTask(title: string) {
    const newTask: CreateTaskDto = {
      title,
      completed: false,
    };
    this.taskService.add(newTask).subscribe(() => this.fetchTasks());
    //TODO: preguntar cual es mejor opcion
    //   this.taskService
    //     .add(newTask)
    //     .subscribe((task) => this._tasks.update((tasks) => [...tasks, task]));
  }

  deleteTask(id: string) {
    this.taskService.delete(id).subscribe(() => this.fetchTasks());

    //TODO: preguntar cual es mejor opcion
    // this.taskService
    //   .delete(id)
    //   .subscribe(() =>
    //     this._tasks.update((tasks) => tasks.filter((task) => task.id !== id))
    //   );
  }

  toggleCompleted(task: Task) {
    const updatedTask = {
      id: task.id,
      title: task.title,
      completed: !task.completed,
    };
    //TODO: hacer llamada al servicio be
    this._tasks.update((tasks) =>
      tasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  }
}
