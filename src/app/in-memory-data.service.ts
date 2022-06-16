// Tama tiedosto esittaa valepalvelimen tietokannan sisallon,
// Tama poistetaan sitten kun fronttisovellus on valmis ja voidaan ryhtya kayttamaan
// oikeaa palvelinta.

/*

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {
  MainListItem,
  ProductGroupOrder,
  OtherListItem,
  User,
} from './dataclasses';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // items on the shopping list for 'main supermarket'
    const items: MainListItem[] = [
      {
        id: 1,
        product: 'Toast',
        quantity: 2,
        productGroup: 'Bread',
      },
      {
        id: 2,
        product: 'Soft cheese',
        quantity: 1,
        productGroup: 'Dairy',
      },
      {
        id: 3,
        product: 'Carrot',
        quantity: 1,
        productGroup: 'Fruit and Veg',
      },
      {
        id: 4,
        product: 'Frozen salmon',
        quantity: 1,
        productGroup: 'Frozen food',
      },
      {
        id: 5,
        product: 'Bleach',
        quantity: 1,
        productGroup: 'Household',
      },
      {
        id: 6,
        product: 'Apples',
        quantity: 1,
        productGroup: 'Fruit and Veg',
      },
    ];
    // products in the product database
    const products: MainListItem[] = [
      {
        id: 1,
        product: 'Crumpet',
        quantity: 1,
        productGroup: 'Bread,',
      },
      {
        id: 2,
        product: 'Cheddar',
        quantity: 1,
        productGroup: 'Dairy',
      },
      {
        id: 3,
        product: 'Tomato',
        quantity: 1,
        productGroup: 'Fruit and Veg',
      },
      {
        id: 4,
        product: 'Frozen salmon',
        quantity: 1,
        productGroup: 'Frozen food',
      },
      {
        id: 5,
        product: 'Bleach',
        quantity: 1,
        productGroup: 'Household',
      },
      {
        id: 6,
        product: 'Apples',
        quantity: 1,
        productGroup: 'Fruit and Veg',
      },
    ];
    // order for productgroups, in order to display the items in the order the user wants
    const productGroupOrder: ProductGroupOrder[] = [
      {
        productGroup: 'Fruit and Veg',
        order: 1,
      },
      {
        productGroup: 'Bread',
        order: 2,
      },
      {
        productGroup: 'Canned food',
        order: 3,
      },
      {
        productGroup: 'Household',
        order: 4,
      },
      {
        productGroup: 'Dairy',
        order: 5,
      },
      {
        productGroup: 'Frozen food',
        order: 6,
      },
      {
        productGroup: 'Other',
        order: 7,
      },
    ];
    // items on the shopping list for 'other shops'
    const otherItems: OtherListItem[] = [
      {
        id: 1,
        product: 'Citric acid',
        comment: 'Buy from Wilko',
      },
      {
        id: 2,
        product: 'Shampoo',
        comment: '',
      },
      {
        id: 3,
        product: 'Baby snacks',
        comment: '',
      },
    ];
    const users: User[] = [
      {
        id: 1,
        username: 'Malki',
        password: 'passu5',
      },
    ];
    return { products, items, productGroupOrder, otherItems, users };
  }

  // Overrides the genId method to ensure that an attendee always has an id.
  // If the attendees array is empty,
  // the method below returns the initial number (1).
  // if the attendees array is not empty, the method below returns the highest
  // attendee id + 1.
  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  }
}

*/
