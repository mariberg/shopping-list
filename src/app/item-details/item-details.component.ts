import { Component, Input, OnInit } from '@angular/core';
import { MainListItem } from '../dataclasses';
import { ProductService } from '../product.service';
import { ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router'; // Angular's service
import { Location } from '@angular/common'; // Angular's service

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  @Input() product?: MainListItem; // product property from parent component. This componentt
  // only receives a product object through this property and displays it, there's no presentation
  // logic.

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private itemService: ItemService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    // this is how we access URL parameters:
    const id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.route.snapshot.paramMap);
    console.log(id);
    console.log(this.product);
    this.productService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }

  goBack(): void {
    this.location.back();
  }

  //TODO this should be modified so that we don't need get product and producGroup from
  //TODO Product class, but quantity can be added here manually
  // save the item on shopping list
  save(): void {
    this.itemService
      .postItemToServer(this.product!)
      .subscribe(() => this.goBack());
    console.log(this.product);
  }
}
