import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../board.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <mat-form-field>
        <mat-label>Status</mat-label>
        <mat-select [(ngModel)]="data.task.status" #status="ngModel" required>
          <mat-option value="To Do">To Do</mat-option>
          <mat-option value="In Progress">In Progress</mat-option>
          <mat-option value="Done">Done</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>summary</mat-label>
        <input
          matInput
          type="text"
          [(ngModel)]="data.task.summary"
          required
          #summary="ngModel"
          (change)="call(summary)"
        />
        <mat-error >
          <div *ngIf="summary.errors?.['required']">Summary is required</div>
        </mat-error>
      </mat-form-field>

      <mat-form-field>
        <textarea
          placeholder="Task description"
          matInput
          [(ngModel)]="data.task.description"
        ></textarea>
      </mat-form-field>
      <br />
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.task.label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngClass]="opt">{{
            opt === 'gray' ? 'check_circle' : 'lens'
          }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        {{ data.isNew ? 'Add Task' : 'Update Task' }}
      </button>

      <app-delete-button
        (delete)="handleTaskDelete()"
        *ngIf="!data.isNew"
      ></app-delete-button>
    </div>
  `,
  styleUrls: ['./dialog.scss'],
})
export class TaskDialogComponent {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private ps: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleTaskDelete() {
    this.ps.removeTask(this.data.boardId, this.data.task);
    this.dialogRef.close();
  }

  call(called){
    console.log(called);
  }
}
