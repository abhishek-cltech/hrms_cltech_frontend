import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader'; 
import { RouterModule, Routes } from '@angular/router';
import { GridEmployeeComponent } from './grid-employee/grid-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataTablesModule } from 'angular-datatables';
import { AddApplicantComponent } from './add-employee/add-employee-resume.component';
import { EditApplicantComponent } from './edit-employee/edit-employee-resume.component';
import { UpdateResumeStatusPopUp } from './update-resume-status/update-resume-status.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BulkuploadComponent } from './bulkUpload/bulkupload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const routes: Routes = [
    { path: '', component:GridEmployeeComponent},
    { path: 'add-applicant', component:AddApplicantComponent},
    { path: 'edit-applicant', component:EditApplicantComponent},
    { path: 'excel-upload', component:BulkuploadComponent},
    
    
  ];
@NgModule({
  declarations: [
    GridEmployeeComponent,
    AddApplicantComponent,
    EditApplicantComponent,
    UpdateResumeStatusPopUp,
    BulkuploadComponent,
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatCardModule,
    NgHttpLoaderModule.forRoot(),
    MatMenuModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ]
})
export class EmployeeModule { }
