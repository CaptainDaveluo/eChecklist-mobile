import {IonicModule, NavController} from "ionic-angular";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TemplatePage} from "./template";


let comp: TemplatePage;
let fixture: ComponentFixture<TemplatePage>;
describe('TemplatePage',()=>{
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplatePage],
      imports: [
        IonicModule.forRoot(TemplatePage)
      ],
      providers: [
        NavController,
      ]
    });
  }));
  beforeEach(()=>{
    fixture = TestBed.createComponent(TemplatePage);
    comp = fixture.componentInstance;
  });
  it('init component',()=>expect(comp).toBeDefined());
});
