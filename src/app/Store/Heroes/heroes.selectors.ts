import { Observable } from 'rxjs';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './heroes.reducers';

const featureHero = createFeatureSelector<State>('feature_Hero');

export const getAllHeroes = createSelector(featureHero, (state: State) => state.data);

