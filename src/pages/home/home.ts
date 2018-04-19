import {Component, ViewChild} from '@angular/core';
import { NavController ,Nav} from 'ionic-angular';
import {MenuController} from "ionic-angular";
import {InstancesPage} from "../instances/instances";
import {TemplatePage} from "../template/template";
import {WorkFlowPage} from "../work-flow/work-flow";
import {StepDetailPage} from "../step-detail/step-detail";
import {StepsPage} from "../steps/steps";
import {InstanceDetailPage} from "../instance-detail/instance-detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {
  selected:string;

  @ViewChild(Nav) nav: Nav;
  public data:any;
  constructor(public navCtrl: NavController,public menuCtrl:MenuController) {
  }

  ionViewDidLoad(){
    this.nav.push(InstancesPage);
  }

  /*ionViewWillEnter(){
    //this.getInstances();
  }*/

  openPage(page) {
    this.selected=page;
    switch (page){
      case 'InstancesPage':
        this.nav.push(InstancesPage);
        break;
      case 'TemplatePage':
        this.nav.push(TemplatePage);
        break;
      case 'WorkFlowPage':
        this.nav.push(WorkFlowPage);
        break;
    }
    this.menuCtrl.close();
  }

}
