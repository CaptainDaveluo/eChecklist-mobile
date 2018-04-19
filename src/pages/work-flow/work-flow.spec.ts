import {IonicModule, NavController} from "ionic-angular";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {WorkFlowPage} from "./work-flow";
import {NavMock} from "../../../test-config/mocks-ionic";
import {WorkflowService} from "../../share/service/workflowService/workflow.service";
import {HttpClient, HttpHandler} from "@angular/common/http";


let comp: WorkFlowPage;
let fixture: ComponentFixture<WorkFlowPage>;
describe('work-flow',()=>{
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkFlowPage],
      imports: [
        IonicModule.forRoot(WorkFlowPage)
      ],
      providers: [
        WorkflowService,
        HttpClient,
        HttpHandler,
        {
          provide:NavController,
          useClass:NavMock
        }
      ]
    });
  }));
  beforeEach(()=>{
    fixture = TestBed.createComponent(WorkFlowPage);
    comp = fixture.componentInstance;
  });
  it('init component',()=>expect(comp).toBeDefined());
});
