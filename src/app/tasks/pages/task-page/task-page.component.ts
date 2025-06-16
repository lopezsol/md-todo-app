import { Component, effect, inject, Signal, signal } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskStatsComponent } from '../../components/task-stats/task-stats.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { TaskService } from '../../services/task.service';
import { useObservable } from '../../../shared/helpers/use-observable.helper';
import type { Task } from '../../interfaces/task.interface';
import type { CreateTaskDto } from '../../interfaces/create-task-dto.interface';

@Component({
  selector: 'task-page',
  imports: [
    TaskListComponent,
    TaskFormComponent,
    TaskStatsComponent,
    LoaderComponent,
  ],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
// TaskPageComponent
export class TaskPageComponent {
  taskService = inject(TaskService);

  tasks = signal<Task[]>([]);

  isLoading!: Signal<boolean>;
  hasError!: Signal<boolean>;
  error!: Signal<string>;

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    const obs$ = this.taskService.findAllTasks();
    const onSuccess = (tasks: Task[]) => {
      this.tasks.set(tasks);
    };

    const { isLoading, hasError, error } = useObservable(obs$, {
      onSuccess,
      errorMessage: 'Error al obtener las tareas',
    });

    this.isLoading = isLoading;
    this.hasError = hasError;
    this.error = error;
  }

  addTask(title: string) {
    const newTask: CreateTaskDto = { title, completed: false };

    const obs$ = this.taskService.addTask(newTask);
    const onSuccess = (task: Task) => {
      this.tasks.update((tasks) => [...tasks, task]);
    };

    const { isLoading, hasError, error } = useObservable(obs$, {
      onSuccess,
      errorMessage: 'Error al agregar la tarea',
    });

    this.isLoading = isLoading;
    this.hasError = hasError;
    this.error = error;
  }

  deleteTask(id: string) {
    const obs$ = this.taskService.deleteTask(id);
    const onSuccess = () => {
      this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    };

    const { isLoading, hasError, error } = useObservable(obs$, {
      onSuccess,
      errorMessage: 'Error al eliminar la tarea',
    });

    this.isLoading = isLoading;
    this.hasError = hasError;
    this.error = error;
  }

  toggleCompleted(task: Task) {
    const { id, completed } = task;
    const obs$ = this.taskService.updateTask(id, { completed: !completed });
    const onSuccess = (updatedTask: Task) => {
      this.tasks.update((tasks) =>
        tasks.map((t) => (t.id === id ? updatedTask : t))
      );
    };

    const { isLoading, hasError, error } = useObservable(obs$, {
      onSuccess,
      errorMessage: 'Error al eliminar la tarea',
    });

    this.isLoading = isLoading;
    this.hasError = hasError;
    this.error = error;
  }
}
