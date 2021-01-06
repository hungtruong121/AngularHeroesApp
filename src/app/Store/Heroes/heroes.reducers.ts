import * as heroActions from './heroes.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Hero } from './hero';

export interface State {
    data: Hero[];
    selected: Hero;
    action: string;
    done: boolean;
    error?: Error;
}

const initialState: State = {
    data: [],
    selected: null,
    action: null,
    done: false,
    error: null,
};

export function reducer(state = initialState, action: AppAction): State {
    switch (action.type){
        case heroActions.GET_HEROES:
            return{
                ...state,
                action: heroActions.GET_HEROES,
                done: false,
                selected: null,
                error: null,
            };
        case heroActions.GET_HEROES_SUCCESS:
            return {
                ...state,
                action: action.payload,
                done: true,
                selected: null,
                error: null
            };
        case heroActions.GET_HERO_ERROR:
            return{
                ...state,
                done: true,
                selected: null,
                error: action.payload,
            };
        case heroActions.GET_HERO:
            return{
                ...state,
                action: heroActions.GET_HERO,
                done: false,
                selected: null,
                error: null,
            };
        case heroActions.GET_HERO_SUCCESS:
            return{
                ...state,
                selected: action.payload,
                done: true,
                error: null,
            };
        case heroActions.GET_HERO_ERROR:
            return{
                ...state,
                selected: null,
                done: true,
                error: action.payload,
            };
        case heroActions.CREATE_HERO:
            return {
                  ...state,
                  selected: action.payload,
                  action: heroActions.CREATE_HERO,
                  done: false,
                  error: null,
                };
        case heroActions.CREATE_HERO_SUCCESS:
            {
                const newHero = {
                    ...state.selected,
                    id: action.payload
                };
                const data = [
                    ...state.data,
                    newHero
                ];
                return {
                    ...state,
                    data,
                    selected: null,
                    error: null,
                    done: true
                };
                }
            case heroActions.CREATE_HERO_ERROR:
                return {
                  ...state,
                  selected: null,
                  done: true,
                  error: action.payload
                };

                case heroActions.DELETE_HERO:
      {
        const selected = state.data.find(h => h.id === action.payload);
        return {
          ...state,
          selected,
          action: heroActions.DELETE_HERO,
          done: false,
          error: null
        };
      }
    case heroActions.DELETE_HERO_SUCCESS:
      {
        const data = state.data.filter(h => h.id !== state.selected.id);
        return {
          ...state,
          data,
          selected: null,
          error: null,
          done: true
        };
      }
    case heroActions.DELETE_HERO_ERROR:
      return {
        ...state,
        selected: null,
        done: true,
        error: action.payload
      };
    }
    return state;
}
export const getHeroesState = createFeatureSelector < State > ('heroes');
export const getAllHeroes = createSelector(getHeroesState, (state: State) => state.data);
export const getHero = createSelector(getHeroesState, (state: State) => {
  if (state.action === heroActions.GET_HERO && state.done) {
    return state.selected;
  } else {
    return null;
  }

});
export const isDeleted = createSelector(getHeroesState, (state: State) =>
  state.action === heroActions.DELETE_HERO && state.done && !state.error);
export const isCreated = createSelector(getHeroesState, (state: State) =>
 state.action === heroActions.CREATE_HERO && state.done && !state.error);
export const isUpdated = createSelector(getHeroesState, (state: State) =>
 state.action === heroActions.UPDATE_HERO && state.done && !state.error);

export const getDeleteError = createSelector(getHeroesState, (state: State) => {
  return state.action === heroActions.DELETE_HERO
    ? state.error
   : null;
});
export const getCreateError = createSelector(getHeroesState, (state: State) => {
  return state.action === heroActions.CREATE_HERO
    ? state.error
   : null;
});
export const getUpdateError = createSelector(getHeroesState, (state: State) => {
  return state.action === heroActions.UPDATE_HERO
    ? state.error
   : null;
});
export const getGamesError = createSelector(getHeroesState, (state: State) => {
  return state.action === heroActions.GET_HEROES
    ? state.error
   : null;
});
export const getGameError = createSelector(getHeroesState, (state: State) => {
  return state.action === heroActions.GET_HERO
    ? state.error
   : null;
});
