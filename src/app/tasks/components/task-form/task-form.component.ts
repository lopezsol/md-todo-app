import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStoreService } from '../../services/task-store.service';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  fb = inject(FormBuilder);
  taskStore = inject(TaskStoreService);
  formUtils = FormUtils;

  taskForm = this.fb.group({
    title: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        FormUtils.noWhitespaceValidator,
        FormUtils.minTrimmedLength(3),
      ],
    ],
  });

  onSubmit() {
    const title = this.taskForm.value.title?.trim();
    this.taskStore.addTask(title!);
    this.taskForm.reset();
  }
}
