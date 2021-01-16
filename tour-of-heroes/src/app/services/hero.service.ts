import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../mock-assets/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; //This is probably what I need to change in order to connect to my real API Gateway

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    this.log('HeroService: fetched heroes')
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    this.log(`HeroService: fetched hero id=${id}`)
    return of(HEROES.find(hero => hero.id === id))
  }

  private log(message: string): void {
    this.messageService.add(message);
  }

}
