import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSessionPage } from './edit-session';

@NgModule({
  declarations: [
    EditSessionPage,
  ],
  imports: [
    IonicPageModule.forChild(EditSessionPage),
  ],
})
export class EditSessionPageModule {}
