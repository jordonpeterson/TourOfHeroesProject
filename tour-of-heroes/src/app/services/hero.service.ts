import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mock-assets/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'https://bp5ibpc6ej.execute-api.us-west-2.amazonaws.com/dev/TourOfHeroes/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    this.log('HeroService: fetched heroes')
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched Heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<Hero> {
    this.log(`HeroService: fetched hero id=${id}`)
    return of(HEROES.find(hero => hero.id === id))
  }

  private log(message: string): void {
    this.messageService.add(message);
  }

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
}
