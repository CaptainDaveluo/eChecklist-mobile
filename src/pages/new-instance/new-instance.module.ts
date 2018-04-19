import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewInstancePage } from './new-instance';

@NgModule({
  declarations: [
    NewInstancePage,
  ],
  imports: [
    IonicPageModule.forChild(NewInstancePage),
  ],
})
export class NewInstancePageModule {}
