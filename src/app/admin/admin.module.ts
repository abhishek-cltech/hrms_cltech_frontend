import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { DataTablesModule } from 'angular-datatables';
import { EditUserDepartmentComponent } from './user/edit-user-department/edit-user-department.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewDepartmentComponent } from './department/view-department/view-department.component';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { MatCardModule } from '@angular/material/card';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FooterModule } from '../component/footer/footer.module';
import { NgHttpLoaderModule } from 'ng-http-loader'; 
import {MatMenuModule} from '@angular/material/menu';
import { AddRecruiterComponent } from './user/add-recruiter/add-recruiter.component';
import { SharedModule } from '../common/shared/shared.module';
@NgModule({
  declarations: [
    UserComponent,
    EditUserDepartmentComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    ViewDepartmentComponent,
    AdminComponent,
    SideNavbarComponent,
    AddRecruiterComponent,
    
    
  ],
  imports: [
    AdminRoutingModule,
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
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatCardModule,
    FooterModule,
    NgHttpLoaderModule.forRoot(),
    MatMenuModule,
    SharedModule
  ]
})
export class AdminModule { }
