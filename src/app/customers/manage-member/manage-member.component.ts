import { Component, OnInit } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { teamMember } from '../teamMember';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-manage-member',
  templateUrl: './manage-member.component.html',
  styleUrl: './manage-member.component.scss'
})
export class ManageMemberComponent implements OnInit{
  member$: Observable<{ id: string; data: teamMember }>;
  
  panelOpenStates: boolean[]= [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.member$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log('User ID:', id);
        if (id) {
          return this.firestore.doc<teamMember>(`teamMembers/${id}`).snapshotChanges().pipe(
            map(action => {
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

}

