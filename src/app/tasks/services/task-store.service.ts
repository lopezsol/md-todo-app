import { computed, Injectable, signal } from '@angular/core';
import type { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  private _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  readonly totalTasks = computed(() => this._tasks().length);
  readonly completedTasks = computed(
    () => this._tasks().filter((task) => task.completed).length
  );
  readonly pendingTasks = computed(
    () => this.totalTasks() - this.completedTasks()
  );

  loadTasks() {
    const tasks = [
      {
        id: 'f38d10e4-3a15-4141-af1b-60e5482346ba',
        title: 'Comprar pan',
        completed: true,
      },
      {
        id: '263abb95-311d-4c14-9435-e4fcead92298',
        title: 'Estudiar Angular',
        completed: false,
      },
      {
        id: '0768ddb4-a47d-4ea5-b519-5eae87d96664',
        title: 'Hacer ejercicio con muchas ganas',
        completed: false,
      },
    ];
    //TODO: hacer llamada al servicio be
    this._tasks.set(tasks);
  }

  addTask(title: string) {
    //TODO: elminir el id cuando se llame al servicio be, no va a ser necesario, el be crea el id
    const id = (this.tasks.length + 1).toString();
    const newTask: Task = {
      title,
      id,
      completed: false,
    };
    //TODO: hacer llamada al servicio be
    this._tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(id: string) {
    //TODO: hacer llamada al servicio be
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  toggleComplete(task: Task) {
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
