import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hero} from '../model/hero';

@Injectable()
export class HeroesService {
  protected URL = 'api/heroes';

  constructor(protected http: HttpClient) {
  }

  /**
   * Find an object by its identifier
   * @param id the object identifier
   * @returns gets the object found
   */
  public findById(id: any): Observable<Hero> {
    return this.http.get<Hero>(this.URL + '/' + id);
  }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.URL, {params});
  }

  /**
   * Delete an object by its identifier field
   * @param id the object identifier
   * @returns gets the response
   */
  public deleteHero(id): Observable<Hero> {
    return this.http.delete<Hero>(this.URL + '/' + id);
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
  public addHero(data: Hero): Observable<Hero> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Hero>(this.URL, data, {headers});
  }

  /**
   * Update specific object into DB
   * @param Hero the object to be updated
   * @returns gets the response
   */
  public update(hero: Hero): Observable<Hero> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put<Hero>(this.URL + '/' + hero.id, hero, {headers});
  }
}
