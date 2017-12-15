import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, Response, ResponseOptions } from '@angular/http'

import { AppService} from './app.service';

import { AppComponent } from './app.component';
import { FormComponent } from './form.component';

import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FormComponent
      ],
      imports: [HttpModule,FormsModule],
      providers: [AppService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'app works!'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));




  it(`Test fake http request using spies`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    //Need to get http object from the TestBed so we can spy 
    //on it
    let http = fixture.debugElement.injector.get(Http);
    
    let ob = new Observable<Response>(function (observer) {
      observer.next(new Response(new ResponseOptions([{"_id":"5985d584a1614319f32f7ff0","title":"333","genre":"terror"}])));
      observer.complete();
    });
    let spy = spyOn(http, 'get').and.callFake((url) => {return ob}); //return our observable when called
    let output = fixture.debugElement.query(By.css(".moviesFromServer"));
    fixture.detectChanges();
    console.log('output>>>',output)
    //Our test
     expect(output.nativeElement.innerHTML).toContain("333");

  }));





});
