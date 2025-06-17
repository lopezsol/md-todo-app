import { Component, inject, signal } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskStatsComponent } from '../../components/task-stats/task-stats.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { SnackbarErrorComponent } from "../../../shared/components/snackbar-error/snackbar-error.component";
import { useObservable } from '../../../shared/helpers/use-observable.helper';
import { TaskService } from '../../services/task.service';
import type { Task } from '../../interfaces/task.interface';
import type { CreateTaskDto } from '../../interfaces/create-task-dto.interface';

@Component({
  selector: 'task-page',
  imports: [
    TaskListComponent,
    TaskFormComponent,
    TaskStatsComponent,
    LoaderComponent,
    SnackbarErrorComponent
],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent {
  taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  isLoading = signal(false);
  hasError = signal(false);
  error = signal('');

  statusSignals = {
    isLoading: this.isLoading,
    hasError: this.hasError,
    error: this.error,
  };

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    const obs$ = this.taskService.findAllTasks();
    const onSuccess = (tasks: Task[]) => {
      this.tasks.set(tasks);
    };
    useObservable(obs$, {
      onSuccess,
      errorMessage: 'Error al obtener las tareas',
      signals: this.statusSignals,
    });
  }

  addTask(title: string) {
    const newTask: CreateTaskDto = { title, completed: false };
    const obs$ = this.taskService.addTask(newTask);
    const onSuccess = (task: Task) => {
      this.tasks.update((tasks) => [...tasks, task]);
    };

    useObservable(obs$, {
      onSuccess,
      errorMessage: 'Error al agregar la tarea',
      signals: this.statusSignals,
    });
  }

  deleteTask(id: string) {
    const obs$ = this.taskService.deleteTask(id);
    const onSuccess = () => {
      this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
    };

    useObservable(obs$, {
      onSuccess,
      errorMessage: 'Error al eliminar la tarea',
      signals: this.statusSignals,
    });
  }

  toggleCompleted(task: Task) {
    const { id, completed } = task;
    const obs$ = this.taskService.updateTask(id, { completed: !completed });
    const onSuccess = (updatedTask: Task) => {
      this.tasks.update((tasks) =>
        tasks.map((t) => (t.id === id ? updatedTask : t))
      );
    };

    useObservable(obs$, {
      onSuccess,
      errorMessage: 'Error al actualizar la tarea',
      signals: this.statusSignals,
    });
  }
}
