import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeResumeComponent } from './employee-resume/employee-resume.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { DataTablesModule } from "angular-datatables";
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { GridEmployeeComponent } from './grid-employee/grid-employee.component';
import { ViewEmployeeResumeComponent } from './view-employee-resume/view-employee-resume.component';
import { EditEmployeeResumeComponent } from './edit-employee-resume/edit-employee-resume.component';
import { ResumePreviewComponent } from './resume-preview/resume-preview.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes: Routes = [
  { path: '', component:GridEmployeeComponent },
  { path: 'add-employee', component: EmployeeResumeComponent },
  {path:  'employees',component:EmployeeTableComponent},
  { path: 'preview-resume', component:ResumePreviewComponent },
  { path: 'view-employee', component:ViewEmployeeResumeComponent },
  { path: 'edit-employee', component:EditEmployeeResumeComponent },
  { path: 'preview-resume', component:ResumePreviewComponent },
  { path: 'detail', component:EmployeeListComponent },
  
];


@NgModule({
  declarations: [
    EmployeeResumeComponent, 
    EmployeeTableComponent,
    GridEmployeeComponent,
    ViewEmployeeResumeComponent,
    EditEmployeeResumeComponent,
    ResumePreviewComponent,
    EmployeeListComponent,
    
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MomentDateModule,
    DataTablesModule,
    jqxGridModule,
    MatIconModule,
    FlexLayoutModule
  ]
})
export class EmployeeResumeModule { }
