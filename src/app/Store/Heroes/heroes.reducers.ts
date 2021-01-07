import * as heroActions from './heroes.actions';
import {AppAction} from '../../app.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { Hero } from '../../model/hero';

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

  switch (action.type) {
    /*************************
   * GET all HEROs actions
   ************************/
  case heroActions.GET_HEROES:
    return {
      ...state,
      action: heroActions.GET_HEROES,
      done: false,
      selected: null,
      error: null
    };
  case heroActions.GET_HEROES_SUCCESS:
    return {
      ...state,
      data: action.payload,
      done: true,
      selected: null,
      error: null
    };
  case heroActions.GET_HEROES_ERROR:
    return {
      ...state,
      done: true,
      selected: null,
      error: action.payload
    };

    /*************************
   * GET HERO by id actions
   ************************/
  case heroActions.GET_HERO:
    return {
      ...state,
      action: heroActions.GET_HERO,
      done: false,
      selected: null,
      error: null
    };
  case heroActions.GET_HERO_SUCCESS:
    return {
      ...state,
      selected: action.payload,
      done: true,
      error: null
    };
  case heroActions.GET_HERO_ERROR:
    return {
      ...state,
      selected: null,
      done: true,
      error: action.payload
    };

    /*************************
   * CREATE HERO actions
   ************************/
  case heroActions.CREATE_HERO:
    return {
      ...state,
      selected: action.payload,
      action: heroActions.CREATE_HERO,
      done: false,
      error: null
    };
  case heroActions.CREATE_HERO_SUCCESS:
    {
      const newHERO = {
        ...state.selected,
        id: action.payload
      };
      const data = [
        ...state.data,
        newHERO
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

    /*************************
   * UPDATE HERO actions
   ************************/
  case heroActions.UPDATE_HERO:
    return {
      ...state,
      selected: action.payload,
      action: heroActions.UPDATE_HERO,
      done: false,
      error: null
    };
  case heroActions.UPDATE_HERO_SUCCESS:
    {
      const index = state
        .data
        .findIndex(h => h.id === state.selected.id);
      if (index >= 0) {
        const data = [
          ...state.data.slice(0, index),
          state.selected,
          ...state.data.slice(index + 1)
        ];
        return {
          ...state,
          data,
          done: true,
          selected: null,
          error: null
        };
      }
      return state;
    }
  case heroActions.UPDATE_HERO_ERROR:
    return {
      ...state,
      done: true,
      selected: null,
      error: action.payload
    };

    /*************************
   * DELETE HERO actions
   ************************/
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

