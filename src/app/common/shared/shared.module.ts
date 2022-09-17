import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveButtonComponent } from './buttons/save/save-button.component';
import { MatButtonModule } from '@angular/material/button';
import { UpdateButtonComponent } from './buttons/update/update-button.component';
import { BackButtonComponent } from './buttons/back/back-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadingComponent } from './heading/heading.component';
import { GridHeadingComponent } from './heading/grid-heading/grid-heading.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlockCopyPasteDirective } from './directives/block-copy-paste-directive';
import { ExtractFirstLeterPipe } from './pipes/extract-first-leter-pipe';



@NgModule({
  declarations: [
      SaveButtonComponent,
      UpdateButtonComponent,
      BackButtonComponent,
       HeadingComponent,
       GridHeadingComponent, 
       BlockCopyPasteDirective, 
       ExtractFirstLeterPipe],
  imports: [
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    FlexLayoutModule
  ],
  exports:[
    BackButtonComponent,
    SaveButtonComponent,
    UpdateButtonComponent,
    HeadingComponent,
    GridHeadingComponent,
    BlockCopyPasteDirective, 
    ExtractFirstLeterPipe
    
  ]
})
export class SharedModule { }
