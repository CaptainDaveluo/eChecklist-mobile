import { TestBed, inject } from '@angular/core/testing';
import { WorkflowService } from './workflow.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Workflow} from "../../model/workflow";
import {URLS} from "../../../assets/urls";

describe('WorkflowService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let workflowService:WorkflowService;
  let httpCliSpy:{get:jasmine.Spy};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [WorkflowService]
    });
    workflowService=TestBed.get(WorkflowService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  });


  let expectedWorkflow:Workflow[];
  expectedWorkflow=[
    {id: '1', name: 'A' },
    { id:'2' , name: 'B' },
  ] as Workflow[];
it('should return workflows',()=>{
  workflowService.getWorkflows().subscribe(next=>{
    expect(next).toEqual(expectedWorkflow, 'should return expected workflows')
  });
});

it('update workflow',()=>{
  let mockworkflw:Workflow={id:'1',name:'ss'};
  workflowService.updateWorkflow(mockworkflw).subscribe(ins=>expect(ins).toEqual(mockworkflw),fail);
  const req = httpTestingController.expectOne(URLS.updateworkflowUrl);
  expect(req.request.method).toEqual('POST');

  // Expect server to return the hero after PUT
  const expectedResponse = new HttpResponse(
    { status: 200, statusText: 'OK', body: mockworkflw });
  req.event(expectedResponse);
});

it('delete workflow',()=>{
  let mockworkflw:Workflow={id:'1',name:'ss'};
  workflowService.deleteWorkflow(mockworkflw).subscribe(ins=>expect(ins).toEqual(mockworkflw),fail);
  const req = httpTestingController.expectOne(URLS.deleteworkflowUrl);
  expect(req.request.method).toEqual('POST');

  // Expect server to return the hero after PUT
  const expectedResponse = new HttpResponse(
    { status: 200, statusText: 'OK', body: mockworkflw });
  req.event(expectedResponse);
});

it('add workflow',()=>{
    let mockworkflw:Workflow={id:'1',name:'ss'};
    workflowService.addWorkflow(mockworkflw).subscribe(ins=>expect(ins).toEqual(mockworkflw),fail);
    const req = httpTestingController.expectOne(URLS.updateworkflowUrl);
    expect(req.request.method).toEqual('POST');

    // Expect server to return the hero after PUT
    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: mockworkflw });
    req.event(expectedResponse);
  });

});
