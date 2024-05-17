import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { teamMember } from '../teamMember';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailPageComponent } from '../detail-page/detail-page.component';
@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss',
})
export class ListPageComponent implements OnInit {
  teamMembers: Observable<{ id: string; data: teamMember }[]>;

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchFakeData();
  }

  fetchFakeData() {
    this.teamMembers = this.firestore
      .collection<teamMember>('teamMembers')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const members = actions.map((a) => {
            const data = a.payload.doc.data() as teamMember;
            const id = a.payload.doc.id;
            return { id, data };
          });
          console.log('Fetched team members:', members);
          return members;
        })
      );
  }

  openDialog(memberId: string) {
    this.dialog.open(DetailPageComponent, {
      data: { memberId },
    });
  }
}
