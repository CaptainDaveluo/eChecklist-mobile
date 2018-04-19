import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {TemplateService} from '../../share/service/templateService/template.service';
import {InstanceService} from "../../share/service/instanceService/instance.service";
import {Template} from "../../share/model/template";
import {Instance} from "../../share/model/instance";
import {Vo} from "../../share/model/vo";
import {InstancesPage} from "../instances/instances";
import {Title} from "@angular/platform-browser";

/**
 * Generated class for the NewInstancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-new-instance',
  templateUrl: 'new-instance.html',
})

export class NewInstancePage {

  insName: string = '';
  instanceForm: FormGroup;
  instanceName: any;
  templateName: any;
  templates: Template [] = [];
  showTemplates: boolean;
  temp: Vo;
  is_selected: boolean;
  showSearchBox: boolean;
  data: string;
  id: string;
  name: string;
  index: any;
  instances: Instance[] = [];

  items: String[];
  types: String[];


  templateSelected: string;
  isbutton_clicked: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public templateService: TemplateService,
              public toastCtrl: ToastController, public instanceService: InstanceService, public titleSet: Title) {
    this.getTemplates();
    this.name = this.navParams.get("name");
    this.id = this.navParams.get("id");
    this.instances = this.navParams.get("instance");
    this.showTemplates = false;
    this.showSearchBox = false;
    this.templateSelected = "Select The Template";
    this.is_selected = false;
    this.isbutton_clicked = false;
    this.instanceForm = formBuilder.group({
      instanceName: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(100), Validators.required])],
      templateName: ['', Validators.nullValidator]
    });
    this.instanceName = this.instanceForm.controls['instanceName'];
    this.templateName = this.instanceForm.controls['templateName'];
  }

  private popToastView(message: string, duration: number) {
    this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: duration,
      showCloseButton: false
    }).present();
  }


  checkInput() {
    if (!/^[^\s][\w\s]+$/.test(this.insName)) {
      this.insName = (this.insName.replace(/[^\w_]/, ""));
    }
    else
      this.insName = (this.insName.replace(/[^\w_\s]/, ""));
  }


  ionViewDidLog() {
    //console.log('ionViewDidLoad NewInstancePage');
  }

  checkRename(name: string): boolean {
    if (this.name == "") {
      for (let i = 0; i < this.instances.length; i++) {
        if (name == this.instances[i].Name) {
          return true;
        }
      }
    }
    else {
      for (let i = 0; i < this.instances.length; i++) {
        if (name == this.instances[i].Name && this.templateSelected == this.instances[i].Template) {
          return true;
        }
      }
    }
    return false;
  }

  saveInstance(value) {
    if (this.checkRename(value.instanceName)) {
      this.popToastView("Instance name duplicated", 3000);
    }
    else {
      this.save(value);
    }
    //this.checkRename(value.instanceName)==true?this.popToastView("The name is exist!", 3000):this.save(value);
  }

  save(value) {
    try {
      let json = "{'id':'" + this.id + "',name':'" + value.instanceName + "',template':'" + this.templateSelected + "'}";
      this.insName = this.insName.trim();
      //console.log(json);
      let instance = new Instance();
      instance.Id = this.id;
      instance.Name = value.instanceName;
      instance.Template = this.templateSelected;
      if (this.name != '') {
        this.instanceService.updateInstance(instance).subscribe(next => {
          try {
            this.popToastView("Submit Successful", 3000);
            this.isbutton_clicked = true;
            setTimeout(handler => {
              this.navCtrl.popToRoot();
            }, 3000);
          } catch (e) {
            this.popToastView("Submit Failed", 3000);
            setTimeout(handler => {
              this.navCtrl.popToRoot();
            }, 3000);
          }
        }, error => {
          //console.log('update failed' + error.toString());
        })
      }
      else {
        this.instanceService.addInstance(instance).subscribe(next => {
          try {
            this.popToastView("Submit Successful", 3000);
            this.isbutton_clicked = true;
            setTimeout(handler => {
              this.navCtrl.popToRoot();
            }, 3000);
          } catch (e) {
            this.popToastView("Submit Failed", 3000);
            setTimeout(handler => {
              this.navCtrl.popToRoot();
            }, 3000);
          }
        }, error => {
          //console.log('add failed' + error.toString());
        })
      }
    }
    catch (e) {
      //this.popToastView("Net work error!", 3000);

    }
  }

  closeItems() {
    setTimeout(any => {
      this.showTemplates = false;
    }, 30);
  }

  showSearch() {
    if (this.showSearchBox) {
      this.showSearchBox = false;
    } else {
      this.showSearchBox = true;
    }
  }

  getItems() {
    //this.initItems();
    let val = this.templateName.value.toLowerCase();
    this.items = this.templates.map((val) => {
      return val['Name'];
    });
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val) > -1);
      })
    }
    if (val.trim() == '')
      this.showTemplates = false;
    else
      this.showTemplates = true;
  }

  getTemplates(): void {
    this.templateService.getTemplates()
      .subscribe(data => {
        this.temp = data;
        try {
          for (let i = 0; i < this.temp.Data.length; i++) {
            this.templates.push(this.temp.Data[i]);
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
    this.templateName.value = "";
    this.showSearchBox = false;
    this.is_selected = true;
  }


}
