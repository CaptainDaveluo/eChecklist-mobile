import {IonicModule, MenuController, Nav, NavController} from "ionic-angular";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {HomePage} from "./home";
import {InstancesPage} from "../instances/instances";
import {TemplatePage} from "../template/template";
import {WorkFlowPage} from "../work-flow/work-flow";
import {HttpClient} from "@angular/common/http";
import {NO_ERRORS_SCHEMA} from "@angular/core";


describe('home page',()=>{
  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let navCtrlSpy: { get: jasmine.Spy };
  let menuCtrlSpy:{get:jasmine.Spy};
  let navSpy:{get:jasmine.Spy};
  beforeEach(async(() => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['get']);
    menuCtrlSpy=jasmine.createSpyObj('MenuController', ['close']);
    navSpy=jasmine.createSpyObj('Nav',['push']);
    comp = new HomePage(<any>navCtrlSpy,<any>menuCtrlSpy);
    comp.nav= (<any>navSpy);
    comp.menuCtrl=(<any>menuCtrlSpy);

  }));
  /*beforeEach(()=>{
    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
  });*/

  it('init component',()=>expect(comp).toBeDefined());
  it('',()=>{
    comp.menuCtrl;
    comp.nav;
    comp.openPage(comp);
    comp.selected;
  });

  it('should open page InstancesPage available',()=>{
    comp.openPage('InstancesPage');
  });

  it('should open page TemplatePage available',()=>{
    comp.openPage('TemplatePage');
  });

  it('should open page WorkFlowPage available',()=>{
    comp.openPage('WorkFlowPage');
  });
});
