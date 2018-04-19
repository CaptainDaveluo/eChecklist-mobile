import {Component, Directive, HostListener} from '@angular/core';
import {IonicPage, NavController, AlertController, ToastController} from 'ionic-angular';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NewInstancePage} from "../new-instance/new-instance";
import {InstanceService} from "../../share/service/instanceService/instance.service";
import {Instance} from "../../share/model/instance";
import {Vo} from "../../share/model/vo";
import {createHostListener} from "@angular/compiler/src/core";

/**
 * Generated class for the InstancesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instances',
  templateUrl: 'instances.html',
})
export class InstancesPage {
  instances: Instance[] = [];
  temp: Vo;
  instance: Instance;
  delId: string = '';

  public data: any;

  @HostListener('click', ['$event']) reSet() {
    if (this.delId != '') {
      this.delId = '';
    }

  }

  constructor(public navCtrl: NavController, public http: HttpClient, public instanceService: InstanceService) {
    this.getData();
  }

  ionViewWillEnter() {
    this.getInstances();
  }

  /*public popNetError() {
    this.popToastView("Net work error!", 3000);
  }*/

  confirmDeleteInstance(id: string) {
    if (this.delId == '' || this.delId != id) {
      this.delId = id;
    } else {
      this.deleteInstance(id);
      this.delId = id;
    }
    event.stopPropagation();


  }

  /*private popToastView(message: string, duration: number) {
    this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: duration,
      showCloseButton: false
    }).present();
  }*/

  newInstance() {
    this.navCtrl.push(NewInstancePage, {
      name: "", instance: this.instances
    });
  }


  getInstances(): void {
    this.instances=[];
    this.instanceService.getInstances()
      .subscribe((instances) => {
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

  /*getInstance(): void {
    this.instanceService.getInstance().subscribe(instance => {
      this.temp = instance;
      this.instance = this.temp.Data[0];
    })
  }*/

  deleteInstance(name: string): string {

    this.instanceService.deleteInstance(name).subscribe(next => {
      this.getInstances();
    });
  return name;
  }

  updateInstance(name: string, id: string): void {
    this.navCtrl.push(NewInstancePage, {
      name: name, id: id, instance: this.instances
    });
  }

  getData():void{
    this.instanceService.getData().subscribe(data=>{
      console.log(data.Children);
    });
  }

}
