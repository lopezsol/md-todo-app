import {
  Component,
  ElementRef,
  inject,
  output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStoreService } from '../../services/task-store.service';
import { FormUtils } from '../../../utils/form-utils';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  fb = inject(FormBuilder);
  taskStore = inject(TaskStoreService);
  newTask = output<string>();

  formUtils = FormUtils;
  @ViewChild('titleInput') titleInputRef!: ElementRef<HTMLInputElement>;

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
    // this.taskStore.addTask(title!);
    this.newTask.emit(title!)
    this.titleInputRef.nativeElement.blur();
    this.taskForm.reset();
  }

}
