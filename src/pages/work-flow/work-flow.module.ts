import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkFlowPage } from './work-flow';

@NgModule({
  declarations: [
    WorkFlowPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkFlowPage),
  ],
})
export class WorkFlowPageModule {}
