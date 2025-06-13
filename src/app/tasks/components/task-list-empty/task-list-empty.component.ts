import { Component } from '@angular/core';
import { LucideAngularModule, CircleCheck } from 'lucide-angular';

@Component({
  selector: 'task-list-empty',
  imports: [LucideAngularModule],
  templateUrl: './task-list-empty.component.html',
  styleUrl: './task-list-empty.component.css',
})
export class TaskListEmptyComponent {
  readonly CircleCheck = CircleCheck;
}
