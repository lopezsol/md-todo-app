import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import type { Task } from '../interfaces/task.interface';
import { CreateTaskDto } from '../interfaces/create-task-dto.interface';

export const baseUrl = environment.API_URL;
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  findAllTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${baseUrl}/todo`)
      .pipe(catchError(this.handleError('Fetching tasks')));
  }

  addTask(task: CreateTaskDto): Observable<Task> {
    return this.http
      .post<Task>(`${baseUrl}/todo`, task)
      .pipe(catchError(this.handleError('Adding task')));
  }

  deleteTask(id: string): Observable<string> {
    return this.http
      .delete<string>(`${baseUrl}/todo/${id}`)
      .pipe(catchError(this.handleError('Deleting task')));
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http
      .patch<Task>(`${baseUrl}/todo/${id}`, task)
      .pipe(catchError(this.handleError('Updating task')));
  }

  private handleError(operation = 'operation') {
    return (error: any) => {
      console.error(`${operation} failed:`, error);

      const message =
        error.status === 0
          ? 'No se pudo conectar con el servidor.'
          : error.error?.message || 'Ocurrió un error inesperado.';

      return throwError(() => new Error(message));
    };
  }
}
