import {
  Component,
  ElementRef,
  inject,
  output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  fb = inject(FormBuilder);
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
    this.newTask.emit(title!)
    this.titleInputRef.nativeElement.blur();
    this.taskForm.reset();
  }

}
