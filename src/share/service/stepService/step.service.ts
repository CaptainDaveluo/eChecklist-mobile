import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {URLS} from "../../../assets/urls";
import {Step} from "../../model/step";
import {Workflow} from "../../model/workflow";
@Injectable()
export class StepService {
  getStepListUrl = URLS.getsteplistUrl;

  addStepUrl = URLS.addstepUrl;

  deleteStepUrl = URLS.deletestepUrl;
  updateStepUrl = URLS.updatestepUrl;
  private step: Step = null;
  constructor(
    private httpClient: HttpClient) {
  }
  deleteStep(step: Step): Observable<Object> {
    return this.httpClient.post(this.deleteStepUrl, step).pipe(
      catchError(this.handleError('getStepList', [])
      ));
  }
  getSteps(workflow: Workflow): Observable<Object> {
    // TODO: waiting for new data structure from url to design errorCode
    return this.httpClient.post(this.getStepListUrl,workflow).pipe(
      catchError(this.handleError('getStepList', [])
      ));
  }

  addStep(step: Step): Observable<Object> {
    console.log('add');
    return this.httpClient.post(this.addStepUrl, step, httpOptions).pipe(
      catchError(this.handleError('addStep', []))
    );

  }

  updateStep(step: Step) {
    console.log('update');
    return this.httpClient.post(this.updateStepUrl, step, httpOptions).pipe(
      catchError(this.handleError('updateStep', []))
    );

  }


  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      // TODO: send message to the log file
      // TODO: send the error to remote logging infrastructure
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })

};
