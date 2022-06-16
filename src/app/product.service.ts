//! added tap method 7.3

// Service for products in the general product database

// Kaytetty Tour of Heroes-tutoriaalia

import { Injectable } from '@angular/core';
//import { Product } from './dataclasses';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MainListItem } from './dataclasses';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //productsUrl =
  //  'https://arcane-bayou-86243.herokuapp.com/products/mainListProducts';
  productsUrl = 'http://localhost:3000/products/mainListProducts';
  //productUrl = 'api/products/mainListProducts';

  // maarittelee verkon yli kulkevan datan JSON-muotoiseksi
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getProducts(): Observable<MainListItem[]> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    return (
      this.http
        .get<MainListItem[]>(this.productsUrl, tokenheaders) // added tokenheaders
        // pipe liittaa metodeja getProducts metodin suorituksen peraan
        .pipe(catchError(this.handleError<MainListItem[]>('getProducts', [])))
    );
  }

  // get product based on id(for item-details component)
  getProduct(_id: string): Observable<MainListItem> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.productsUrl}/${_id}`;
    return this.http
      .get<MainListItem>(url, tokenheaders) // added tokenheaders
      .pipe(catchError(this.handleError<any>(`getProduct id=${_id}`)));
  }

  //TODO adding products to database - call this function in a component
  addProduct(product: MainListItem): Observable<MainListItem> {
    return this.http
      .post<MainListItem>(this.productsUrl, product, this.httpOptions)
      .pipe(catchError(this.handleError<MainListItem>('addProduct')));
  }

  //! get products whose name contain search term - ei toimi vaan palauttaa koko products taulukon
  searchProducts(term: string): Observable<MainListItem[]> {
    if (!term.trim()) {
      return of([]);
    }
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    return this.http
      .get<MainListItem[]>(`${this.productsUrl}/product/${term}`, tokenheaders) // added tokenheaders /?product=${term}
      .pipe(
        tap((x) =>
          x.length //! tap added 7.March to see if the search term is correct
            ? this.log(`found products matching "${term}"`)
            : this.log(`no products matching "${term}"`)
        ),
        catchError(this.handleError<MainListItem[]>('searchProducts', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //! added 7.3
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
