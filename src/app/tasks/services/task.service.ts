import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import type { Task } from '../interfaces/task.interface';
import { CreateTaskDto } from '../interfaces/create-task-dto.interface';

export const baseUrl = environment.API_URL;
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  findAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}/todo`);
  }

  addTask(task: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(`${baseUrl}/todo`, task);
  }

  deleteTask(id: string): Observable<string> {
    return this.http.delete<string>(`${baseUrl}/todo/${id}`);
  }

  updateTask(id: string, task: Partial<Task>) {
    return this.http.patch<Task>(`${baseUrl}/todo/${id}`, task);
  }
}
