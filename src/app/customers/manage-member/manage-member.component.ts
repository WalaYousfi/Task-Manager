import { Component, OnInit } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { teamMember } from '../teamMember';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { AssignTaskComponent } from '../assign-task/assign-task.component';
import firebase from 'firebase/compat/app';
import { error } from 'console';
import { Task } from '../../kanban/board.model';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrl: './manage-member.component.scss',
})
export class ManageMemberComponent implements OnInit {
  member$: Observable<{ id: string; data: teamMember }>;

  panelOpenStates: boolean[] = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.member$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        console.log('User ID:', id);
        if (id) {
          return this.firestore
            .doc<teamMember>(`teamMembers/${id}`)
            .snapshotChanges()
            .pipe(
              map((action) => {
                const data = action.payload.data() as teamMember;
                const id = action.payload.id;
                return { id, data };
              })
            );
        } else {
          return of(null);
        }
      })
    );
  }

  openDialog(memberId: string) {
    const dialogRef = this.dialog.open(AssignTaskComponent, {
      width: '250px',
      data: { memberId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assignTask(memberId, result);
      }
    });
  }

  assignTask(memberId: string, task: Task) {
    this.firestore
      .doc<teamMember>(`teamMembers/${memberId}`)
      .update({
        Tasks: firebase.firestore.FieldValue.arrayUnion(
          task
        ) as unknown as Task[],
      })
      .then(() => {
        console.log('Task assigned successfully');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  }
}
