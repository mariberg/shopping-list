import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MainListItem } from '../dataclasses';
import { ItemService } from '../item.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-main-supermarket',
  templateUrl: './main-supermarket.component.html',
  styleUrls: ['./main-supermarket.component.css'],
})
export class MainSupermarketComponent implements OnInit {
  items: MainListItem[] = [];
  //products: MainListItem[] = [];
  products$!: Observable<MainListItem[]>;
  // subject that is needed in reactive search:
  private searchTerms = new Subject<string>();
  selectedProduct!: MainListItem;

  constructor(
    private itemService: ItemService,
    private productService: ProductService
  ) {}

  // getting the shopping list
  getList(): void {
    this.itemService.getItems().subscribe((items) => (this.items = items));
  }

  // submitting new item to shopping list through service
  onSubmit(formData: any) {
    console.log(formData);
    this.itemService
      .postItemToServer({
        _id: formData._id,
        product: formData.product,
        quantity: formData.quantity,
        productGroup: formData.productGroup,
      })
      .subscribe((item) => {
        this.items.push(item);
      });

    //TODO Form should empty after adding the product and the user should get notification that product has been added
  }

  // deleting selected item from the list
  deleteItem(item: MainListItem): void {
    this.items = this.items.filter((h) => h !== item);
    this.itemService.deleteMainListItem(item).subscribe();
  }

  // push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // getting the shopping list that has been saved for this user
    this.getList();

    //this.getProducts();

    this.products$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.productService.searchProducts(term))
    );
  }
}
