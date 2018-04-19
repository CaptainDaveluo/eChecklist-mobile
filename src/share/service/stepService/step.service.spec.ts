import { TestBed, inject } from '@angular/core/testing';
import { StepService } from './step.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Step} from "../../model/step";
import {URLS} from "../../../assets/urls";

describe('StepService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let stepService:StepService;
  let httpCliSpy:{get:jasmine.Spy};
  beforeEach(() => {
  TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers: [StepService]
  });
  stepService=TestBed.get(StepService);
  httpClient= TestBed.get(HttpClient);
  httpTestingController = TestBed.get(HttpTestingController);
  });

  let expectedSteps:Step[];
  expectedSteps=[
    {id: '1', name: 'A', workflowid:'5ad0075aa4cf38232c279fe9',instances: null},
    { id: '1', name: 'A',workflowid:'5ad007d6a4cf38232c279fea',instances: null },
  ] as Step[];

  it('should return steps',()=>{
    /*stepService.getSteps().subscribe(next=>{
      expect(next).toEqual(expectedSteps, 'should return expected steps')
    });*/
  });

  it('update step',()=>{
    let mockstep:Step={id: '1', name: 'A',workflowid:'5ad007d6a4cf38232c279feb',instances: null};
    stepService.updateStep(mockstep).subscribe(ins=>expect(ins).toEqual(mockstep),fail);
    const req = httpTestingController.expectOne(URLS.updatestepUrl);
    expect(req.request.method).toEqual('POST');

    // Expect server to return the hero after PUT
    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: mockstep });
    req.event(expectedResponse);
  });

  it('delete step',()=>{
    let mockstep:Step={id: '1', name: 'A',workflowid:'5ad007d6a4cf38232c279feb',instances: null};
    stepService.deleteStep(mockstep).subscribe(ins=>expect(ins).toEqual(mockstep),fail);
    const req = httpTestingController.expectOne(URLS.deletestepUrl);
    expect(req.request.method).toEqual('POST');

    // Expect server to return the hero after PUT
    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: mockstep });
    req.event(expectedResponse);
  });

  it('add step',()=>{
    let mockstep:Step={id: '1', name: 'A',workflowid:null,instances: null};
    stepService.addStep(mockstep).subscribe(ins=>expect(ins).toEqual(mockstep),fail);
    const req = httpTestingController.expectOne(URLS.addstepUrl);
    expect(req.request.method).toEqual('POST');

    // Expect server to return the hero after PUT
    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: mockstep });
    req.event(expectedResponse);
  });

});
