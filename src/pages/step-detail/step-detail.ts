import {Component, HostListener} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Instance} from "../../share/model/instance";
import {HttpClient} from "@angular/common/http";
import {Vo} from "../../share/model/vo";
import {InstanceService} from "../../share/service/instanceService/instance.service";
import {NewInstancePage} from "../new-instance/new-instance";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InstanceDetailPage} from "../instance-detail/instance-detail";
import {Workflow} from "../../share/model/workflow";
import {Step} from "../../share/model/step";
import {StepService} from "../../share/service/stepService/step.service";

/**
 * Generated class for the StepDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-step-detail',
  templateUrl: 'step-detail.html',
})
export class StepDetailPage {

  stName: string = '';
  stepForm: FormGroup;
  stepName: any;
  isbutton_clicked: boolean;
  instances: Instance[] = [];
  temp: Vo;
  instance: Instance;
  delId: string = '';
  workflowId:any;
  isStepCreated:boolean;

  public data: any;

  @HostListener('click', ['$event']) reSet() {
    if (this.delId != '') {
      this.delId = '';
    }

  }

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public http: HttpClient, public formBuilder: FormBuilder, public instanceService: InstanceService, public stepService: StepService) {
    this.isbutton_clicked = false;
    this.workflowId = this.navParams.get("workflowId");
    console.log(this.workflowId);
    this.isStepCreated=false;
    this.stepForm = formBuilder.group({
      stepName: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(100), Validators.required])]
    });
    this.stepName = this.stepForm.controls['stepName'];
  }

  checkInput() {
    if (!/^[^\s][\w\s]+$/.test(this.stName)) {
      this.stName = (this.stName.replace(/[^\w_]/, ""));
    }
    else
      this.stName = (this.stName.replace(/[^\w_\s]/, ""));
  }

  ionViewWillEnter() {
    this.getInstances();
  }

  /*public popNetError() {
    this.popToastView("Net work error!", 3000);
  }*/

  confirmDeleteInstance(id: string) {
    event.stopPropagation();
    if (this.delId == '' || this.delId != id) {
      this.delId = id;
    } else {
      this.deleteInstance(id);
      this.delId = id;
    }
  }

  newInstanceDetal(){
    this.navCtrl.push(InstanceDetailPage, {});
  }

  back() {
    this.navCtrl.pop();
    /*let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'Are you sure to back?',
      buttons: ['Cancel', {
        text: 'OK', handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();*/
  }

  saveStep(value) {
    try {
      let step = new Step();
      step.name = value.stepName;
      step.workflowid=this.workflowId;
      this.stepService.addStep(step).subscribe(next => {
        console.log(next);
      }, error => {
        console.log(error);
      });
    } catch (e) {
      console.log(e);
    }
  }


  addInstance() {
    this.navCtrl.push(NewInstancePage, {
      name: "", instance: this.instances
    });
  }


  getInstances(): void {
    this.instances = [];
    this.instanceService.getInstances()
      .subscribe(instances => {
        this.temp = instances;
        try {
          for (let i = 0; i < this.temp.Data.length; i++) {
            console.log(this.temp.Data[i]);
            this.instances.push(this.temp.Data[i]);
          }
        } catch (e) {

        }
        console.log(this.instances);
      });
  }

  deleteInstance(id: string): string {

    this.instanceService.deleteInstance(id).subscribe(next => {
      this.getInstances();
    });
    return id;
  }

  updateInstance(name: string, id: string): void {
    this.navCtrl.push(NewInstancePage, {
      name: name, id: id, instance: this.instances
    });
  }

}
