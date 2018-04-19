import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Instance} from "../../share/model/instance";
import {InstanceService} from "../../share/service/instanceService/instance.service";
import {Vo} from "../../share/model/vo";


/**
 * Generated class for the InstanceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instance-detail',
  templateUrl: 'instance-detail.html',
})
export class InstanceDetailPage {

  templateSelected: string;
  showSearchBox: boolean;
  instanceForm: FormGroup;
  instanceName: any;
  showInstances: boolean;
  instances: Instance[] = [];
  items: String[];
  is_selected: boolean;
  temp: Vo;


  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,public instanceService: InstanceService,public toastCtrl:ToastController) {
    this.getInstances();
    this.showSearchBox = false;
    this.is_selected=false;
    this.templateSelected = "select instance";
    this.instanceForm = formBuilder.group({
      instanceName: ['', Validators.nullValidator]
    });
    this.instanceName = this.instanceForm.controls['instanceName'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstanceDetailPage');
  }

  showSearch() {
    if (this.showSearchBox) {
      this.showSearchBox = false;
    } else {
      this.showSearchBox = true;
    }
  }

  closeItems() {
    setTimeout(any => {
      this.showInstances = false;
    }, 30);
  }

  getItems() {
    //this.initItems();
    let val = this.instanceName.value.toLowerCase();
    this.items = this.instances.map((val) => {
      return val['Name'];
    });
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val) > -1);
      })
    }
    if (val.trim() == '')
      this.showInstances = false;
    else
      this.showInstances = true;
  }

  private popToastView(message: string, duration: number) {
    this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: duration,
      showCloseButton: false
    }).present();
  }

  getInstances(): void {
    this.instanceService.getInstances()
      .subscribe(data => {
        this.temp = data;
        try {
          for (let i = 0; i < this.temp.Data.length; i++) {
            this.instances.push(this.temp.Data[i]);
          }
        } catch (e) {
          this.popToastView("net work error", 2000);
        }
      }, (error) => {
        console.log(error);
      });
  }

  select(val: any) {
    //console.log(val);
    this.templateSelected = val;
    this.instanceName.value = "";
    this.showSearchBox = false;
    this.is_selected = true;
    this.instanceService.getInstanceDetail().subscribe(node=>{
      console.log(node);
    },error=>{
      console.log(error);
    })
  }
}
