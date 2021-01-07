import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Hero } from '../model/hero';
import { HeroService } from '../hero.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {Observable} from 'rxjs';
import * as heroesActions from '../Store/Heroes/heroes.actions';
import {getAllHeroes} from '../Store/Heroes/heroes.reducers';
import { HeroesService } from '../services/hero-service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
