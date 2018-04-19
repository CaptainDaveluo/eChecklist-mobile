import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepDetailPage } from './step-detail';

@NgModule({
  declarations: [
    StepDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StepDetailPage),
  ],
})
export class StepDetailPageModule {}
