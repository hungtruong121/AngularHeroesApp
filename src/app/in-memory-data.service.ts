import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './Store/Heroes/hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Dr Nice', age: 14 },
      { id: 2, name: 'Narco', age: 15 },
      { id: 3, name: 'Bombasto', age: 30 },
      { id: 4, name: 'Celeritas', age: 23 },
      { id: 5, name: 'Magneta', age: 27 },
      { id: 6, name: 'RubberMan', age: 20 },
      { id: 7, name: 'Dynama', age: 25 },
      { id: 8, name: 'Dr IQ', age: 28 },
      { id: 9, name: 'Magma', age: 17 },
      { id: 10, name: 'Tornado', age: 18 }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
