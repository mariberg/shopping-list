// Service for products in the general product database

import { Injectable } from '@angular/core';
//import { Product } from './dataclasses';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MainListItem } from './dataclasses';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //productsUrl =
  //  'https://arcane-bayou-86243.herokuapp.com/products/mainListProducts';
  productsUrl = 'http://localhost:3000/products/mainListProducts';
  //productUrl = 'api/products/mainListProducts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getProducts(): Observable<MainListItem[]> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    return this.http
      .get<MainListItem[]>(this.productsUrl, tokenheaders)
      .pipe(catchError(this.handleError<MainListItem[]>('getProducts', [])));
  }

  // get product based on id(for item-details component)
  getProduct(_id: string): Observable<MainListItem> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.productsUrl}/${_id}`;
    return this.http
      .get<MainListItem>(url, tokenheaders)
      .pipe(catchError(this.handleError<any>(`getProduct id=${_id}`)));
  }

  //TODO adding products to database - call this function in a component (admin access)
  addProduct(product: MainListItem): Observable<MainListItem> {
    return this.http
      .post<MainListItem>(this.productsUrl, product, this.httpOptions)
      .pipe(catchError(this.handleError<MainListItem>('addProduct')));
  }

  // get products based on search criteria
  searchProducts(term: string): Observable<MainListItem[]> {
    if (!term.trim()) {
      return of([]);
    }
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    return this.http
      .get<MainListItem[]>(`${this.productsUrl}/product/${term}`, tokenheaders)
      .pipe(catchError(this.handleError<MainListItem[]>('searchProducts', [])));
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
}
