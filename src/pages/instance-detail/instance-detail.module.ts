import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstanceDetailPage } from './instance-detail';

@NgModule({
  declarations: [
    InstanceDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InstanceDetailPage),
  ],
})
export class InstanceDetailPageModule {}
