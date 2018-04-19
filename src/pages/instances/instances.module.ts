import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstancesPage } from './instances';

@NgModule({
  declarations: [
    InstancesPage,
  ],
  imports: [
    IonicPageModule.forChild(InstancesPage),
  ],
})
export class InstancesPageModule {}
