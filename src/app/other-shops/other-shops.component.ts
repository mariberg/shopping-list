import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { OtherListItem } from '../dataclasses';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-shops',
  templateUrl: './other-shops.component.html',
  styleUrls: ['./other-shops.component.css'],
})
export class OtherShopsComponent implements OnInit {
  items: OtherListItem[] = [];
  item!: OtherListItem;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  // get data from service to component
  getList(): void {
    this.itemService
      .getOtherItems()
      .subscribe((otherItems) => (this.items = otherItems));
  }

  // submitting new item to server through service
  onSubmit(formData: any) {
    console.log(formData);
    this.itemService
      .postOtherItemToServer({
        _id: formData.id,
        product: formData.product,
        comment: formData.comment,
      })
      .subscribe((item) => {
        this.items.push(item);
      });
  }
  //TODO Formin pitaisi viela tyhjentya sen jalkeen kun push on tapahtunut ja käyttäjälle
  //TODO pitäisi tulla viesti siita, etta tuote on lisatty listalle!

  // deleting selected item from the list
  deleteItem(item: OtherListItem): void {
    this.items = this.items.filter((h) => h !== item);
    this.itemService.deleteOtherItem(item).subscribe();
  }

  ngOnInit(): void {
    this.getList();
  }
}
