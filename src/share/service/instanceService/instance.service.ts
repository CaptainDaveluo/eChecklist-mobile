import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {Instance} from '../../model/instance';
import {Vo} from "../../model/vo";
import {URLS} from "../../../assets/urls";
import {Node} from "../../model/Node";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class InstanceService {


  constructor(private http: HttpClient, private messageService: MessageService) {

  }



  getInstances(): Observable<Vo> {

    return this.http.get<Vo>(URLS.getinstanceUrl);
  }


  /** GET hero by id. Will 404 if id not found
  getInstance(): Observable<Vo> {
    let data: string = '{name:"guo"}';
    const url = `${this.instanceUrl + '/getone'}`;
    return this.http.post<Vo>(url, data, httpOptions).pipe(
    );
  }
   */
  /* GET heroes whose name contains search term
  searchInstances(term: string): Observable<Instance[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Instance[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found instances matching "${term}"`)),
      catchError(this.handleError<Instance[]>('searchInstances', []))
    );
  }
*/
  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addInstance(instance: Instance): Observable<Instance> {
    return this.http.post<Instance>(URLS.addinstanceUrl, instance, httpOptions).pipe(
      tap((instance: Instance) => this.log(`added instance`)),
      catchError(this.handleError<Instance>('addTemplate'))
    );
  }

  /** DELETE: delete the hero from the server*/


  deleteInstance(id: string): Observable<Vo> {
    let data: string = '{Id:' + '"' + id + '"' + '}';
    //let data=new Instance();
    //data.Name=name;
    return this.http.post<Vo>(URLS.deletinstanceUrl, data, httpOptions);
  }


  // PUT: update the hero on the server
  updateInstance(instance: Instance): Observable<Instance> {
    return this.http.post(URLS.updateinstanceUrl, instance, httpOptions).pipe(
      tap((instance: Instance) => this.log(`updated instance`)),
      catchError(this.handleError<Instance>('updateInstance'))
    );
  }

  getInstanceDetail(): Observable<Node>{
    return this.http.get<Node>(URLS.getinstancedetailUrl);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService*/
  private log(message: string) {
    this.messageService.add('TemplateService: ' + message);
  }

  getData():Observable<any>{
    return this.http.get("assets/data.json");
  }


}
