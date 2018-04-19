import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NewInstancePage} from "../new-instance/new-instance";
import {HomePage} from "../home/home";
// import {FormGroup, Validators} from "@angular/forms";
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  loginName: any;
  // template_count_valid:boolean;
  passwordName: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,private http:HttpClient) {

    this.loginForm = formBuilder.group({
      // loginName: ['', Validators.compose([Validators.minLength(1), Validators.maxLength(100), Validators.required])],
      // templateType: [null, Validators.compose([Validators.nullValidator])],
      // templateName: [null, Validators.compose([Validators.required])]      //加入输入约束
    });
    this.loginName = this.loginForm.controls['loginName'];  //按键绑定
    this.passwordName = this.loginForm.controls['passwordName'];
  }

/*ionViewDidLoad() {
  console.log('ionViewDidLoad LoginPage');
}*/

  loginsuccess(){
  this.navCtrl.push(HomePage,{
    title:"test"
  });
}
save(value){
  /*console.log(value.loginName);
  console.log(value.passwordName);*/
  // let json = "{'name':'"+value.instanceName+"','type':'"+value.templateType+"','template':'"+value.templateName+"'}";
  // console.log(json);
  // this.http.post(this.newInstanceUrl,json,httpOptions).subscribe(data=>{
  //   console.log(data['data']['Id']);
}
}
