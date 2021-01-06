import * as fromHero from './Store/Heroes/heroes.reducers';

export interface AppState {
    heroes: fromHero.State;
}
