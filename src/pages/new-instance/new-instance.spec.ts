import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Instance} from "../../share/model/instance";
import {DebugElement} from '@angular/core';
import {NewInstancePage} from "./new-instance";
import {NavParams, ToastController} from "ionic-angular";
import {IonicModule, Platform, NavController} from 'ionic-angular/index';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {InstanceService} from "../../share/service/instanceService/instance.service";
import {MessageService} from "../../share/service/message.service";
import {TemplateService} from "../../share/service/templateService/template.service";
import {MockNavParams} from "../../share/mockNavParams";
import {asyncData} from "../../testing/async-observable-helpers";
import {Vo} from "../../share/model/vo";
import {ComponentFixtureAutoDetect} from "@angular/core/testing";

describe('new instances', () => {
  let de: DebugElement;
  let comp: NewInstancePage;
  let fixture: ComponentFixture<NewInstancePage>;
  let instanceService: InstanceService;
  let templateService: TemplateService;
  let httpClientSpy: { get: jasmine.Spy };
  let messageServiceSpy: { get: jasmine.Spy };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewInstancePage],
      imports: [
        IonicModule.forRoot(NewInstancePage)
      ],
      providers: [
        {provide: ComponentFixtureAutoDetect, useValue: true},
        NavController,
        HttpClient,
        HttpHandler,
        InstanceService,
        MessageService,
        TemplateService,
        {
          provide: NavParams,
          useClass: MockNavParams
        },
        ToastController
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstancePage);
    comp = fixture.componentInstance;
    instanceService = TestBed.get(InstanceService);

    messageServiceSpy = jasmine.createSpyObj('MessageService', ['get']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    templateService = new TemplateService(<any>httpClientSpy, <any>messageServiceSpy);
  });

  const expectedTemplates: Vo = {
    statusCode: '01',
    Data: [{"Id": "5acc1c3aa4cf390bb0d739cb", "Name": "SuperMan", "Type": "Strong"}, {
      "Id": "5acc1c30a4cf390bb0d739ca",
      "Name": "SuperMan",
      "Type": "Strong"
    }, {"Id": "5acabaa0a4cf38298019af71", "Name": "SuperMan", "Type": "Strong"}, {
      "Id": "5acaba7da4cf38298019af70",
      "Name": "Model",
      "Type": "Well"
    }, {"Id": "5acab9c5a4cf38298019af6d", "Name": "TemplateThree", "Type": "Nice"}, {
      "Id": "5ac9ddada4cf3e132c2d9102",
      "Name": "TemplateOne",
      "Type": "Good"
    }, {"Id": "5ac9dc0aa4cf3e132c2d9100", "Name": "TemplateTwo", "Type": "Good"}]
  };
  beforeEach(() => {
    spyOn(templateService, 'getTemplates').and.callThrough();
    httpClientSpy.get.and.returnValue(asyncData(expectedTemplates));
    comp.templateService = templateService;
  });


  it('init component', () => expect(comp).toBeDefined());

  it('should checkRename worked', () => {
    let inss = new Instance();
    comp.name = "";
    inss.Id = '';
    inss.Template = '';
    inss.Type = '';
    inss.Name = '';
    comp.instances = [inss, inss];
    expect(comp.checkRename('ss')).toBe(false);
    comp.name = "11";
    expect(comp.checkRename("ss")).toBe(false);
  });

  it('should select worked', () => {
    comp.select('ss');
  });

  it('saveInsance should checkRename first', () => {
    let inss = new Instance();
    inss.Id = '';
    inss.Template = '';
    inss.Type = '';
    inss.Name = '';
    comp.instances = [inss, inss];
    comp.saveInstance('kkk');
  });

  it('should get all templates available', async(() => {
    comp.getTemplates();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      console.log(comp.temp);
    });
  }));

  it('should showSearch available', async(() => {
    comp.closeItems();
    comp.showSearch();
  }));


  it('should get template item available', () => {
    comp.getTemplates();
    comp.templateName.value = "t";
    comp.getItems();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      console.log(comp.templates);
    });
  });

  it('should input check up available', () => {
    comp.insName = '&&test';
    comp.checkInput();
    expect(comp.insName).toMatch("test");
  })

  it('shoud save instance available', () => {
    comp.insName = 'nametest';
    comp.id = '1005';
    comp.name = 'testInstance';
    comp.templateSelected = 'TemplateThree';
    comp.instanceForm.value.instanceName = 'newinstanceName';
    comp.save(comp.instanceForm.value);
  });

  it('shoud update instance available', () => {
    comp.insName = 'nametest';
    comp.id = '1005';
    comp.name = '';
    comp.templateSelected = 'TemplateThree';
    comp.instanceForm.value.instanceName = 'newinstanceName';
    comp.save(comp.instanceForm.value);
  });

});
