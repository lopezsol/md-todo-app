import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStoreService } from '../../services/task-store.service';

@Component({
  selector: 'task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  fb = inject(FormBuilder);
  taskStore = inject(TaskStoreService);

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    const title = this.taskForm.value.title?.trim();
    this.taskStore.addTask(title!);
    this.taskForm.reset();
  }
}
