import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './department/department.component';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component:AdminComponent ,children:[
  {path:'',loadChildren:()=>import('./dashboard/dashboard.module').then((m)=>m.DashboardModule)},
  {path:'profile',loadChildren:()=>import('./profile/profile.module').then((m)=>m.ProfileModule)},
  { path: 'recruiter', component:UserComponent },
  { path: 'department', component:DepartmentComponent },
  { path: 'applicant', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule), }, 
  { path: 'group-master', loadChildren: () => import('./group-master/group-master.module').then(m => m.GroupMasterModule), }, 
  {path:'register-user',loadChildren:() =>import('./register-user/register-user.module').then(m=>m.RegisterUserModule)},
  {path:"reports",loadChildren:()=>import('./report/report.module').then(m=>m.ReportModule)}
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
