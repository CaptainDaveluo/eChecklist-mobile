import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule }    from '@angular/common/http';
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import { HomePage } from '../pages/home/home';
import {NewInstancePage} from "../pages/new-instance/new-instance";
import {InstancesPage} from "../pages/instances/instances";
import {InstanceService} from "../share/service/instanceService/instance.service";
import {TemplateService} from "../share/service/templateService/template.service";
import {MessageService} from "../share/service/message.service";
import {FormsModule} from "@angular/forms";
import {TemplatePage} from "../pages/template/template";
import {WorkFlowPage} from "../pages/work-flow/work-flow";
import {StepDetailPage} from "../pages/step-detail/step-detail";
import {StepsPage} from "../pages/steps/steps";
import {InstanceDetailPage} from "../pages/instance-detail/instance-detail";
import {WorkflowService} from "../share/service/workflowService/workflow.service";
import {StepService} from "../share/service/stepService/step.service";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    NewInstancePage,
    InstancesPage,
    TemplatePage,
    WorkFlowPage,
    StepDetailPage,
    StepsPage,
    InstanceDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    NewInstancePage,
    InstancesPage,
    TemplatePage,
    WorkFlowPage,
    StepDetailPage,
    StepsPage,
    InstanceDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    TemplateService,
    InstanceService,
    MessageService,
    WorkflowService,
    StepService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

}
