import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { teamMember } from '../teamMember';
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent {
  teamMember$: Observable<teamMember>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { memberId: string },
    private firestore: AngularFirestore
  ) {
    this.teamMember$ = this.firestore
      .doc<teamMember>(`teamMembers/${data.memberId}`)
      .valueChanges();
  }
}
