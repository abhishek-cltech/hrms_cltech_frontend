import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedEmployeeReportComponent } from './selected-applicant-report/selected-applicant-report.component';
import { Router, RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { SharedModule } from 'src/app/common/shared/shared.module';
const routes=[
        {path:'',component:SelectedEmployeeReportComponent}
]
@NgModule({
  declarations: [SelectedEmployeeReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    NgHttpLoaderModule.forRoot(),
    SharedModule
  ]
})
export class ReportModule { }
