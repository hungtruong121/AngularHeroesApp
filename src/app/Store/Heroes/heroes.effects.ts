import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import * as heroActions from './heroes.actions';
import {
    AddHero,
    AddHeroSuccess,
    AddHeroError,
    GetAllHeroesSuccess,
    GetAllHeroesError,
    GetHero,
    GetHeroSuccess,
    GetHeroError,
    RemoveHero,
    RemoveHeroSuccess,
    RemoveHeroError,
    UpdateHero,
    UpdateHeroSuccess,
    UpdateHeroError,
} from './heroes.actions';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { HeroesService } from '../../services/hero-service';
import { Hero } from '../../model/hero';
import { catchError, map, switchMap} from 'rxjs/operators';
import { ChildActivationEnd } from '@angular/router';

@Injectable()
export class HeroEffects {
    constructor(
        private actions$: Actions,
        private service: HeroesService
    ){}
    @Effect()
    getAllHeroes$: Observable<Action> = this.actions$.pipe(
    ofType(heroActions.GET_HEROES),
    switchMap(() => this.service.findAll()),
    map(heroes => new GetAllHeroesSuccess(heroes)),
    catchError((err) => [new GetAllHeroesError(err)])
    );
    @Effect()
    getHero$ = this.actions$.pipe(
        ofType(heroActions.GET_HERO),
        map((action: GetHero) => action.payload),
        switchMap(id => this.service.findById(id)),
        map(hero => new GetHeroSuccess(hero)),
        catchError((err) => [new GetHeroError(err)])
    );
    @Effect()
    updateHero$ = this.actions$.pipe(
        ofType(heroActions.UPDATE_HERO),
        map((action: UpdateHero) => action.payload),
        switchMap(hero => this.service.update(hero)),
        map(() => new UpdateHeroSuccess()),
        catchError((err) => [new UpdateHeroError(err)])
    );
    @Effect()
    createHero$ = this.actions$.pipe(
        ofType(heroActions.CREATE_HERO),
        map((action: AddHero) => action.payload),
        switchMap( newHero => this.service.addHero(newHero)),
        map((response) => new AddHeroSuccess(response.id)),
        catchError((err) => [new AddHeroError(err)])
    );
    @Effect()
    removeHero$ = this.actions$.pipe(
        ofType(heroActions.DELETE_HERO),
        map((action: RemoveHero) => action.payload),
        switchMap(id => this.service.deleteHero(id)),
        map((hero: Hero) => new RemoveHeroSuccess(hero)),
        catchError((err) => [new RemoveHeroError(err)])
    );
}
