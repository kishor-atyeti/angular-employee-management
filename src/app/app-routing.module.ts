import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee-list', pathMatch: 'full' },
  { path: 'employee-list', component: EmployeeListComponent, title: 'Employee List' },
  { path: 'new-employee', component: EmployeeFormComponent, title: 'New Employee' },
  { path: 'edit-employee/:id', component: EmployeeFormComponent, title: 'Edit Employee' },
  { path: '**', component: NotFoundComponent, title: '404 Not Found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
