import { Workflow } from '../../model/workflow';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {URLS} from "../../../assets/urls";


@Injectable()
export class WorkflowService {
  getWorkflowListUrl = URLS.getworkflowlistUrl;

  addWorkflowUrl = URLS.addworkflowUrl;

  deleteWorkflowUrl = URLS.deleteworkflowUrl;
  updateWorkflowUrl = URLS.updateworkflowUrl;

  private workflow: Workflow = null;

  constructor(private httpClient: HttpClient) {

  }

  deleteWorkflow(workflow: Workflow): Observable<Object> {
    return this.httpClient.post(this.deleteWorkflowUrl, workflow).pipe(
      catchError(this.handleError('getWorkflowList', [])
      ));
  }
  getWorkflows(): Observable<Object> {
    // TODO: waiting for new data structure from url to design errorCode
    return this.httpClient.get(this.getWorkflowListUrl).pipe(
      catchError(this.handleError('getWorkflowList', [])
      ));
  }

  addWorkflow(workflow: Workflow): Observable<Object> {
    return this.httpClient.post(this.addWorkflowUrl, workflow, httpOptions).pipe(
      catchError(this.handleError('addworkflow', []))
    );

  }

  updateWorkflow(workflow: Workflow) {
    return this.httpClient.post(this.updateWorkflowUrl, workflow, httpOptions).pipe(
      catchError(this.handleError('updateworkflow', []))
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

