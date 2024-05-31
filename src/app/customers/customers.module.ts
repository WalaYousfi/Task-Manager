import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ManageMemberComponent } from './manage-member/manage-member.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailPageComponent, ListPageComponent, ManageMemberComponent, AssignTaskComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    MatDialogModule,
    MatExpansionModule,
    ReactiveFormsModule
  ],
})
export class CustomersModule {}
