import { computed, inject, Injectable, signal } from '@angular/core';
import type { Task } from '../interfaces/task.interface';
import { TaskService } from './task.service';
import type { CreateTaskDto } from '../interfaces/create-task-dto.interface';
import { Observable, Observer } from 'rxjs';

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
  readonly isLoading = signal(false);
  readonly hasError = signal(false);
  readonly error = signal('');

  fetchTasks() {
    const obs$ = this.taskService.findAllTasks();
    const onSuccess = (tasks: Task[]) => {
      this._tasks.set(tasks);
    };

    this.subscribeWithState(obs$, {
      onSuccess,
      errorMessage: 'Error al obtener las tareas',
    });
  }

  addTask(title: string) {
    const newTask: CreateTaskDto = { title, completed: false };

    const obs$ = this.taskService.addTask(newTask);
    const onSuccess = (task: Task) => {
      this._tasks.update((tasks) => [...tasks, task]);
    };

    this.subscribeWithState(obs$, {
      onSuccess,
      errorMessage: 'Error al agregar la tarea',
    });

    // TODO: preguntar cual es mejor opcion
    // const onSuccess = () => this.fetchTasks();
  }

  deleteTask(id: string) {
    id = '123';
    const obs$ = this.taskService.deleteTask(id);
    const onSuccess = () => {
      this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    };

    this.subscribeWithState(obs$, {
      onSuccess,
      errorMessage: 'Error al eliminar la tarea',
    });
    // TODO: preguntar cual es mejor opcion
    // const onSuccess = () => this.fetchTasks();
  }

  toggleCompleted(task: Task) {
    const { id, completed } = task;
    const obs$ = this.taskService.updateTask(id, { completed: !completed });
    const onSuccess = (updatedTask: Task) => {
      this._tasks.update((tasks) =>
        tasks.map((t) => (t.id === id ? updatedTask : t))
      );
    };

    this.subscribeWithState(obs$, {
      onSuccess,
      errorMessage: 'Error al actualizar la tarea',
    });
    // TODO: preguntar cual es mejor opcion
    // const onSuccess = () => this.fetchTasks();
  }

  private subscribeWithState<T>(
    obs$: Observable<T>,
    config: {
      onSuccess: (value: T) => void;
      onError?: (err: unknown) => void;
      errorMessage?: string;
      onComplete?: () => void;
    }
  ) {
    this.isLoading.set(true);
    this.hasError.set(false);
    this.error.set('');

    obs$.subscribe({
      next: (res) => {
        config.onSuccess(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.hasError.set(true);

        const devMessage = err?.message || 'Unexpected error';
        console.error(`[${config.errorMessage}]`, devMessage); // Solo en consola

        const userMessage =
          `${config.errorMessage}. Por favor, intenta más tarde.` ||
          'Ocurrió un error inesperado.';
        this.error.set(userMessage);

        this.error.set(userMessage);
        console.log(userMessage);
        this.isLoading.set(false);

        if (config.onError) config.onError(err);
      },
      complete: () => {
        if (config.onComplete) config.onComplete();
      },
    });
  }

}
