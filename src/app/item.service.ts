// this service is for all the user specific lists

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MainListItem, ProductGroupOrder, OtherListItem } from './dataclasses';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  //itemurl = 'https://arcane-bayou-86243.herokuapp.com/lists/mainListItems';
  itemurl = 'http://localhost:3000/lists/mainListItems';
  //otheritemurl =
  //'https://arcane-bayou-86243.herokuapp.com/lists/otherListItems';
  otheritemurl = 'http://localhost:3000/lists/otherListItems';
  //productGroupUrl =
  //'https://arcane-bayou-86243.herokuapp.com/lists/productGroupOrder';
  productGroupUrl = 'http://localhost:3000/lists/productGroupOrder';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  const: MainListItem[] = [];

  constructor(private http: HttpClient) {}

  // getting user specific mainListItems
  getItems(): Observable<MainListItem[]> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    }; //token is sent with header
    const url = `${this.itemurl}/${mytoken.username}`; // username from the token is added to url
    return this.http.get<MainListItem[]>(url, tokenheaders);
    //TODO error handling
  }

  // posting a new item on user's mainListItems
  postItemToServer(newMainListItem: MainListItem): Observable<MainListItem> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.itemurl}/${mytoken.username}`;
    return this.http.post<MainListItem>(url, newMainListItem, tokenheaders);
  }

  // deleting an item on the main supermarket shopping list
  deleteMainListItem(item: MainListItem): Observable<MainListItem> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const id = typeof item === 'string' ? item : item._id;
    const url = `${this.itemurl}/${mytoken.username}/${id}`;
    return this.http.delete<MainListItem>(url, tokenheaders);
  }

  getOtherItems(): Observable<OtherListItem[]> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.otheritemurl}/${mytoken.username}`;
    return this.http.get<OtherListItem[]>(url, tokenheaders);
  }

  postOtherItemToServer(
    newOtherListItem: OtherListItem
  ): Observable<OtherListItem> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.otheritemurl}/${mytoken.username}`;
    return this.http.put<OtherListItem>(url, newOtherListItem, tokenheaders);
  }

  deleteOtherItem(item: OtherListItem): Observable<OtherListItem> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const id = typeof item === 'string' ? item : item._id;
    const url = `${this.otheritemurl}/${mytoken.username}/${id}`;
    return this.http.delete<OtherListItem>(url, tokenheaders);
  }

  getProductGroupOrder(): Observable<ProductGroupOrder[]> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.productGroupUrl}/${mytoken.username}`;
    return (
      this.http
        .get<ProductGroupOrder[]>(url, tokenheaders)
        // pipe liittaa metodeja getProducts metodin suorituksen peraan
        .pipe(
          catchError(
            this.handleError<ProductGroupOrder[]>('getProductGroupOrder', [])
          )
        )
    );
  }

  // replacing the productGroupOrder with an amended version
  postProductGroupOrderToServer(
    newProductGroupOrder: ProductGroupOrder[]
  ): Observable<ProductGroupOrder[]> {
    const mytoken = JSON.parse(sessionStorage['accesstoken']);
    const tokenheaders = {
      headers: new HttpHeaders({ 'x-access-token': mytoken.token }),
    };
    const url = `${this.productGroupUrl}/${mytoken.username}`;
    console.log(newProductGroupOrder);
    return this.http.put<ProductGroupOrder[]>(
      url,
      newProductGroupOrder,
      tokenheaders
    );
  }

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
