import {Component, HostListener} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StepDetailPage} from "../step-detail/step-detail";
import {WorkflowService} from "../../share/service/workflowService/workflow.service";
import {Workflow} from "../../share/model/workflow";
import {Step} from "../../share/model/step";
import {StepService} from "../../share/service/stepService/step.service";
import {NewInstancePage} from "../new-instance/new-instance";

/**
 * Generated class for the StepsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-steps',
  templateUrl: 'steps.html',
})
export class StepsPage {

  steps: Step[] = [];
  temp: any;
  workflow:any;
  wfName: string = '';
  workflowForm: FormGroup;
  workflowName: any;
  isbutton_clicked: boolean;
  isWorkflowCreated:boolean;
  workflowId:any;

  public data: any;
  delId: string = '';

  @HostListener('document:click', ['$event']) reSet() {
    if (this.delId != '') {
      this.delId = '';
    }

  }

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public formBuilder: FormBuilder, public workflowService: WorkflowService, public stepService: StepService) {
    this.isbutton_clicked = false;
    this.isWorkflowCreated=false;
    this.workflowForm = formBuilder.group({
      workflowName: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(100), Validators.required])]
    });
    this.workflowName = this.workflowForm.controls['workflowName'];
  }

  ionViewWillEnter() {
    //this.getSteps();
  }

  confirmDeleteStep(id: string) {
    event.stopPropagation();
    if (this.delId == '' || this.delId != id) {
      this.delId = id;
    } else {
      this.deleteStep(id);
      this.delId = id;
    }
  }

  checkInput() {
    if (!/^[^\s][\w\s]+$/.test(this.wfName)) {
      this.wfName = (this.wfName.replace(/[^\w_]/, ""));
    }
    else
      this.wfName = (this.wfName.replace(/[^\w_\s]/, ""));
  }

  newStep() {
    this.navCtrl.push(StepDetailPage, {'workflowId':this.workflowId});
  }

  back() {
    this.navCtrl.pop();
  }

  saveWorkflow(value) {
    try {
      let workflow = new Workflow();
      workflow.name = value.workflowName;
      console.log(workflow.name);
      this.workflowService.addWorkflow(workflow).subscribe(next => {
        console.log(next);
        this.workflow = next;
        this.workflowId=this.workflow.Data[0].Id;
        this.isWorkflowCreated=true;
        console.log(this.workflowId);
        this.getSteps(this.workflowId);
      }, error => {
        console.log(error);
      });
    } catch (e) {
      console.log(e);
    }
  }

  getSteps(workflowId): void {
    this.steps = [];
    let workflow = new Workflow();
    workflow.id=this.workflowId;
    this.stepService.getSteps(workflow).subscribe(steps => {
      this.temp = steps;
      try {
        for (let i = 0; i < this.temp.Data.length; i++) {
          this.steps.push(this.temp.Data[i]);
        }
      }
      catch (e) {
        console.log(e);
      }
    }, error1 => {
      console.log(error1);
    })
  }

  deleteStep(id: string): string {
    let step = new Step();
    step.id = id;
    this.stepService.deleteStep(step).subscribe(next => {
      this.getSteps(this.workflowId);
    });
    return id;
  }

  updateStep(name: string, id: string): void {
    this.navCtrl.push(NewInstancePage, {
      name: name, id: id, instance: this.steps
    });
  }

}
