import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {TemplateService} from "../templateService/template.service";
import {MessageService} from "../message.service";
import {Vo} from "../../model/vo";
import {InstanceService} from "./instance.service";
import {Instance} from "../../model/instance";
import {URLS} from "../../../assets/urls";

describe('templateService',()=>{

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let templateService:TemplateService;
  let httpCliSpy:{get:jasmine.Spy};
  let instanceService:InstanceService;

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[TemplateService,MessageService,InstanceService]
    });

    /*httpCliSpy=jasmine.createSpyObj('HttpClient',['get'])
    templateService=new TemplateService(<any>httpCliSpy,new MessageService());
    instanceService=new InstanceService(<any>httpCliSpy,new MessageService());*/
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    templateService=TestBed.get(TemplateService);
    instanceService=TestBed.get(InstanceService);


  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  let expectedVo:Vo;

  expectedVo=
    {"statusCode":"01",
      "Data":[{"Id":"5acf3871a4cf671b288d6323","Name":"aa","Type":"Strong","Template":"SuperMan"},
        {"Id":"5acf39caa4cf671b288d6324","Name":"aaa","Type":"Good","Template":"TemplateTwo"},
        {"Id":"5ad0075aa4cf38232c279fe9","Name":"w","Type":"Nice","Template":"TemplateThree"},
        {"Id":"5ad007d6a4cf38232c279fea","Name":"vvv","Type":"Good","Template":"TemplateOne"},
        {"Id":"5ad01142a4cf3c232cb4923a","Name":"aaae","Type":"Strong","Template":"SuperMan"}]}
  ;

  it('should return Vo',()=>{
    instanceService.getInstances().subscribe(vo=>expect(vo).toEqual(expectedVo),fail)
    const req = httpTestingController.expectOne(URLS.getinstanceUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock heroes
    req.flush(expectedVo);
  });

  it('should add instance success',()=>{
    let instancemock:Instance;
    instancemock={
      Id:'',
      Name:'ggggggggg',
      Template:'TemplateOne',
      Type:'Strong'
    }
    instanceService.addInstance(instancemock).subscribe(ins=>expect(ins).toEqual(instancemock),fail);
    const req = httpTestingController.expectOne(URLS.addinstanceUrl);
    expect(req.request.method).toEqual('POST');

    // Expect server to return the hero after PUT
    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: instancemock });
    req.event(expectedResponse);
  });

  it('should uodate instance success', function () {
    let instancemock:Instance;
    instancemock={
      Id:'',
      Name:'ggggggggg',
      Template:'TemplateOne',
      Type:'Strong'
    }
    instanceService.updateInstance(instancemock).subscribe(ins=>expect(ins).toEqual(instancemock),fail);
    const req = httpTestingController.expectOne(URLS.updateinstanceUrl);
    expect(req.request.method).toEqual('POST');

    // Expect server to return the hero after PUT
    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: instancemock });
    req.event(expectedResponse);
  });

  it('should delete instance success',()=>{
    let vo:Vo;
    vo={
      statusCode:'01',
      Data:[
        {Id:'',
          Name:'ggggggggg',
          Template:'TemplateOne',
          Type:'Strong'}
      ]

    }
    instanceService.deleteInstance('ggggggggg').subscribe(ins=>expect(ins).toEqual(vo),fail);
    const req = httpTestingController.expectOne(URLS.deletinstanceUrl);
    expect(req.request.method).toEqual('POST');

    // Expect server to return the hero after PUT
    const expectedResponse = new HttpResponse(
      { status: 200, statusText: 'OK', body: vo });
    req.event(expectedResponse);
  });
});
