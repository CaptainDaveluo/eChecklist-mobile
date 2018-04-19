import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {TemplateService} from "./template.service";
import {MessageService} from "../message.service";
import {Vo} from "../../model/vo";
import {URLS} from "../../../assets/urls";

describe('templateService',()=>{

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let templateService:TemplateService;
  let httpCliSpy:{get:jasmine.Spy};

  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[TemplateService,MessageService]
    });

    httpCliSpy=jasmine.createSpyObj('HttpClient',['get'])
    templateService=new TemplateService(<any>httpCliSpy,new MessageService());

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    templateService=TestBed.get(TemplateService);



  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  let expectedVo:Vo;

  expectedVo=
    {"statusCode":"011","Data":[{"Id":"5acc1c3aa4cf390bb0d739cb","Name":"SuperMan","Type":"Strong"},{"Id":"5acc1c30a4cf390bb0d739ca","Name":"SuperMan","Type":"Strong"},{"Id":"5acabaa0a4cf38298019af71","Name":"SuperMan","Type":"Strong"},{"Id":"5acaba7da4cf38298019af70","Name":"Model","Type":"Well"},{"Id":"5acab9c5a4cf38298019af6d","Name":"TemplateThree","Type":"Nice"},{"Id":"5ac9ddada4cf3e132c2d9102","Name":"TemplateOne","Type":"Good"},{"Id":"5ac9dc0aa4cf3e132c2d9100","Name":"TemplateTwo","Type":"Good"}]}
  ;

  it('should return Vo',()=>{
    templateService.getTemplates().subscribe(vo=>expect(vo).toEqual(expectedVo),fail);
    const req = httpTestingController.expectOne(URLS.gettemplatesUrl);
    expect(req.request.method).toEqual('GET');

    // Respond with the mock heroes
    req.flush(expectedVo);
  });
});
