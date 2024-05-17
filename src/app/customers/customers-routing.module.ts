import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './list-page/list-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { ManageMemberComponent } from './manage-member/manage-member.component';

const routes: Routes = [
  { path: '', component: ListPageComponent },
  { path: 'teamMember/:id', component: DetailPageComponent },
  { path: 'manageMember/:id', component: ManageMemberComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
