import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from '../message.service';
import {Template} from '../../model/template';
import {Vo} from "../../model/vo";
import {URLS} from "../../../assets/urls";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class TemplateService {



  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  /** GET heroes from the server */
  getTemplates(): Observable<Vo> {
    return this.http.get<Vo>(URLS.gettemplatesUrl);
  }

  /** GET hero by id. Will 404 if id not found
  getTemplate(id: number): Observable<Template> {
    const url = `${this.templatesUrl}/${id}`;
    return this.http.get<Template>(url).pipe(
      tap(_ => this.log(`fetched template id=${id}`)),
      catchError(this.handleError<Template>(`getTemplate id=${id}`))
    );
  }

  /* GET heroes whose name contains search term
  searchTemplates(term: string): Observable<Template[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Template[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found templates matching "${term}"`)),
      catchError(this.handleError<Template[]>('searchTemplates', []))
    );
  }
*/
  //////// Save methods //////////

  /** POST: add a new hero to the server
  addTemplate(template: Template): Observable<Template> {
    return this.http.post<Template>(this.templatesUrl, template, httpOptions).pipe(
      tap((template: Template) => this.log(`added template w/ id=${template.Id}`)),
      catchError(this.handleError<Template>('addTemplate'))
    );
  }
   */
  /** DELETE: delete the hero from the server
   deleteTemplate (template: Template | number): Observable<Template> {
    const id = typeof template === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
   */

  /** PUT: update the hero on the server
   updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
   */

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result

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

  /** Log a HeroService message with the MessageService
  private log(message: string) {
    this.messageService.add('TemplateService: ' + message);
  }
*/
}
