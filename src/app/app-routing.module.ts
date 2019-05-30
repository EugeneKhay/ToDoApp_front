import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InprogressComponent } from './inprogress/inprogress.component';
import { NewComponent } from './new/new.component';
import { DoneComponent } from './done/done.component';
import { DelayedComponent } from './delayed/delayed.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'todo', component: TaskComponent},
  {path: 'inprogress', component: InprogressComponent},
  {path: 'new', component: NewComponent},
  {path: 'done', component: DoneComponent},
  {path: 'delayed', component: DelayedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}