import { Component, OnInit } from '@angular/core';
import { ProductGroupOrder } from '../dataclasses';
import { ItemService } from '../item.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common'; // Angular's service

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  productGroups: ProductGroupOrder[] = [];

  constructor(private itemService: ItemService, private location: Location) {}

  // getting the productGroupOrder
  getProductGroupOrder(): void {
    this.itemService
      .getProductGroupOrder()
      .subscribe((productGroups) => (this.productGroups = productGroups));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.productGroups,
      event.previousIndex,
      event.currentIndex
    );
  }

  // sending amended productGroupOrder to service
  save(): void {
    this.itemService
      .postProductGroupOrderToServer(this.productGroups!)
      .subscribe(() => this.goBack());
  }

  ngOnInit(): void {
    this.getProductGroupOrder();
  }

  // user can move back to previous location with cancel button
  goBack(): void {
    this.location.back();
  }
}
