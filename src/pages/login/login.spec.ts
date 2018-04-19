import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {NavMock} from "../../../test-config/mocks-ionic";
import {NavParams} from "ionic-angular";
import {IonicModule, Platform, NavController} from 'ionic-angular/index';
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {InstanceService} from "../../share/service/instanceService/instance.service";
import {MessageService} from "../../share/service/message.service";
import {TemplateService} from "../../share/service/templateService/template.service";
import {MockNavParams} from "../../share/mockNavParams";
import {asyncData} from "../../testing/async-observable-helpers";
import {Vo} from "../../share/model/vo";
import {LoginPage} from "./login";

describe('new instances', () => {
  let de: DebugElement;
  let comp: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let instanceService: InstanceService;
  let templateService: TemplateService;
  let httpClientSpy: { get: jasmine.Spy };
  let messageServiceSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage)
      ],
      providers: [

        HttpClient,
        HttpHandler,
        InstanceService,
        MessageService,
        TemplateService,
        {
          provide:NavController,
          useClass:NavMock
        },
        {
          provide: NavParams,
          useClass: MockNavParams
        }
      ]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    comp = fixture.componentInstance;

    messageServiceSpy = jasmine.createSpyObj('MessageService', ['get']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    templateService = new TemplateService(<any>httpClientSpy, <any>messageServiceSpy);
    instanceService = new InstanceService(<any>httpClientSpy, <any>messageServiceSpy);
  });

  const expectedInstances: Vo = {
    statusCode: '01',
    Data: [{
      "Id": "5ac9b97fa4cf3b28cc97a3a1",
      "Name": "Testonmobile",
      "Type": null,
      "Template": "guo"
    }, {
      "Id": "5ac9b997a4cf3b28cc97a3a2",
      "Name": "HereIsTest",
      "Type": "",
      "Template": "TemplateOne"
    }, {
      "Id": "5acc96d7a4cf3b1c5c850e80",
      "Name": "hzhzhz22",
      "Type": "Good",
      "Template": "TemplateOne"
    }, {
      "Id": "5acc974fa4cf3b1c5c850e81",
      "Name": "hzhzhz22",
      "Type": "Good",
      "Template": "TemplateOne"
    }, {"Id": "5ad05219a4cf3b058812407f", "Name": "zwtest01", "Type": "zwtest001", "Template": "zwtest01"}]
  };

  beforeEach(() => {
    spyOn(instanceService, 'getInstances').and.callThrough();
    httpClientSpy.get.and.returnValue(asyncData(expectedInstances));
    //comp.instanceService = instanceService;
  });


  it('init component', () => expect(comp).toBeDefined());

  it('init',()=>{
    comp.loginsuccess();
  })

  /*it('hhh', () => {
    comp.confirmDeleteInstance("5ac9b97fa4cf3b28cc97a3a1");
  })


  it('should get all instances available', async(() => {
    comp.getInstances();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      console.log(comp.temp);
    });
  }));

  it('deleteInstance should successful', async(() => {
    comp.deleteInstance("5ac9b97fa4cf3b28cc97a3a1");
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      console.log(comp.temp);
    });
  }));

  it('updateInstance should successful',async(()=>{
    comp.updateInstance("Testonmobile","5ac9b97fa4cf3b28cc97a3a1");
  }))



  it('should get template item available', () => {
    comp.newInstance();
    //comp.ionViewWillEnter();
  });
  it('init',()=>{
    comp.ionViewWillEnter();
    comp.reSet();
  })*/

});
