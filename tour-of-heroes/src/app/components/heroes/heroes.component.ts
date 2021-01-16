import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  //
  // onSelect(hero: Hero): void {
  //   (this.selectedHero && hero.id === this.selectedHero.id) ? this.selectedHero = undefined : this.selectedHero = hero;
  //   if(this.selectedHero) {
  //     this.messageService.add(`HeroesComponent selected: ${hero.name}: Id: ${hero.id}`)
  //   }
  // }

}
