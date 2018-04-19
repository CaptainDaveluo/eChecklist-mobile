import {Component, Directive, HostListener} from '@angular/core';
import {IonicPage, NavController, AlertController, ToastController} from 'ionic-angular';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NewInstancePage} from "../new-instance/new-instance";
import {StepsPage} from "../steps/steps";
import {WorkflowService} from "../../share/service/workflowService/workflow.service";
import {Workflow} from "../../share/model/workflow";
import {StepDetailPage} from "../step-detail/step-detail";

/**
 * Generated class for the WorkFlowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-work-flow',
  templateUrl: 'work-flow.html',
})
export class WorkFlowPage {

  workflows: Workflow[] = [];
  temp: any;
  workflow: Workflow;
  delId: string = '';

  public data: any;

  @HostListener('document:click', ['$event']) reSet() {
    if (this.delId != '') {
      this.delId = '';
    }

  }



  constructor(public navCtrl: NavController,public workflowService:WorkflowService) {
  }

  ionViewWillEnter() {
    this.getWorkFlows();
  }

  confirmDeleteWorkFlow(id: string) {
    event.stopPropagation();
    if (this.delId == '' || this.delId != id) {
      this.delId = id;
    } else {
      this.deleteWorkFlow(id);
      this.delId = id;
    }



  }

  /*private popToastView(message: string, duration: number) {
    this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: duration,
      showCloseButton: false
    }).present();
  }*/

  newWorkflow() {
    this.navCtrl.push(StepsPage, {
      name: "", workflow: this.workflows
    });
  }


  getWorkFlows(): void {
    this.workflows=[];
    this.workflowService.getWorkflows().subscribe(workflows=>{
      this.temp = workflows;
      try {
        console.log(this.temp);
        for (let i = 0; i < this.temp.Data.length; i++) {
          console.log(this.temp.Data[i]);
          if(this.temp.Data[i].Name==undefined||this.temp.Data[i].Name==undefined)
            this.temp.Data[i].Name=" ";
          this.workflows.push(this.temp.Data[i]);
        }
        console.log(this.workflows);
      } catch (e) {

      }
    },error=>{
      console.log(error);
    });
  }

  deleteWorkFlow(id: string): string {
    let workflow = new Workflow();
    workflow.id=id;
    this.workflowService.deleteWorkflow(workflow).subscribe(next=>{
      this.getWorkFlows();
    });


    return id;
  }

  updateWorkFlow(name: string, id: string): void {
    this.navCtrl.push(StepsPage, {
      name: name, id: id, instance: this.workflows
    });
  }
}
