import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.scss'
})
export class ListPageComponent implements OnInit{
  customers : any;

  constructor(private seo: SeoService, private db: AngularFirestore){}

  ngOnInit(){
    this.seo.generateTags({
      title: 'Customer List',
      description: 'A list filled with customers'
    });

    this.customers = this.db.collection('customers').valueChanges({ idField: 'id' });
    
    
  }

}
