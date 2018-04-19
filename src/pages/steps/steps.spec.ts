import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {IonicModule, NavController, NavParams} from "ionic-angular";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MessageService} from "../../share/service/message.service";
import {NavMock} from "../../../test-config/mocks-ionic";
import {MockNavParams} from "../../share/mockNavParams";
import {StepsPage} from "./steps";
import {WorkflowService} from "../../share/service/workflowService/workflow.service";
import {Vo} from "../../share/model/vo";
import {StepService} from "../../share/service/stepService/step.service";


describe('work-flow steps page',()=>{

  let comp: StepsPage;
  let fixture: ComponentFixture<StepsPage>;
  let httpClientSpy: { get: jasmine.Spy };
  let workService:{get:jasmine.Spy};

  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [StepsPage],
      imports: [
        IonicModule.forRoot(StepsPage)
      ],
      providers: [
        HttpClient,
        HttpHandler,
        MessageService,
        WorkflowService,
        StepService,
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

  beforeEach(()=>{
    fixture = TestBed.createComponent(StepsPage);
    comp = fixture.componentInstance;
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    workService = jasmine.createSpyObj('WorkflowService',['addWorkflow','getWorkflows']);
  });

  it("init work-flow steps component",()=>{
    expect(comp).toBeDefined();
  });
});
