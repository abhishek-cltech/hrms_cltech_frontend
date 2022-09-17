import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { RefreshComponent } from './common/refresh/refresh.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { DataTablesModule } from 'angular-datatables';
import { ResumeModalModule } from './pop-up/resume-modal/resume-modal.module';
import { MatCardModule } from '@angular/material/card';
import { DepartmentComponent } from './admin/department/department.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { FooterModule } from './component/footer/footer.module';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SharedModule } from './common/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import { ProfilesModule } from './pop-up/update-profile/profile.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RefreshComponent,
    RegistrationComponent,
    LoginComponent,
    DepartmentComponent,
    ForgotpasswordComponent
    
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    jqxGridModule,
    DataTablesModule,
    ResumeModalModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    FooterModule,
    SharedModule,
    FlexLayoutModule ,
    MatMenuModule,
    NgHttpLoaderModule.forRoot(), 
    ProfilesModule,
    MatProgressSpinnerModule,
    BackButtonDisableModule.forRoot()
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports:[]
})
export class AppModule { }
