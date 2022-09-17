import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader'; 
import { RouterModule, Routes } from '@angular/router';
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
import { EditRegisterUserComponent } from './edit-register-user/edit-regsiter-user.component';
import { GridRegisterUserComponent } from './register-user-grid/grid-register-user.component';
import { AddRegisterUserComponent } from './add-register-user/add-register-user.component';
import { RegisterUserForm } from './shared/form/register-user-form.ts.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/common/shared/shared.module';
import { ViewRegisterUserComponent } from './view-register-user/view-regsiter-user.component';

const routes: Routes = [
    { path: '', component:GridRegisterUserComponent},
    { path: 'add-register-user', component:AddRegisterUserComponent},
    { path: 'edit-register-user', component:EditRegisterUserComponent},
    { path: 'view-register-user', component:ViewRegisterUserComponent},
    
  ];
@NgModule({
  declarations: [
    GridRegisterUserComponent,
    EditRegisterUserComponent,
    AddRegisterUserComponent,
    RegisterUserForm,
    ViewRegisterUserComponent
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
    SharedModule
  ]
})
export class RegisterUserModule { }
