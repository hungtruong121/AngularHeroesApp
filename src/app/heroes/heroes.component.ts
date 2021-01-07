import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import { Hero } from '../model/hero';
import {Observable} from 'rxjs';
import * as heroesActions from '../Store/Heroes/heroes.actions';
import {getAllHeroes} from '../Store/Heroes/heroes.reducers';
import { HeroesService } from '../services/hero-service';
import {AddHero} from '../store/games.actions';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;
  pageOfHeroes: Array<any>;
  page: 4;
  hero: Hero = new Hero();
  heros: Hero[] = [];



  constructor(private heroService: HeroesService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.heroes = this.store.select(getAllHeroes);
    this.heroService.findAll().subscribe(result => {
      this.heros = result;
    });
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //   .subscribe(heroes => this.heroes = heroes);
  // }

  add(name: string): void {
    this.hero.heros = this.heros
      .filter((p) => p.checked === true)
      .map(p => p.id);
    this.store.dispatch(new AddHero(this.hero))
      });
  }

  delete(id: number): void {
   this.store.dispatch(new heroesActions.RemoveHero(id));
  }

  onChangePage(pageOfHeroes: Array<any>) {
    this.pageOfHeroes = pageOfHeroes;
  }

}
