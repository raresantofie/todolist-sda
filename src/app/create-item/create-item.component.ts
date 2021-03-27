import { Component, OnInit } from '@angular/core';
import {ItemService} from '../item.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {

  translationMap: Record<string, string> = {
    NOT_STARTED: 'To do',
    IN_PROGRESS: 'In progress',
    DONE: 'Done'
  };

  item: Item = {
    name: '',
    itemStatus: ItemStatus.TODO,
    description: ''
  };

  statusArray: ItemStatus[] = [
    ItemStatus.TODO, ItemStatus.IN_PROGRESS, ItemStatus.DONE
  ];

  itemsArray: Observable<ItemResponse[]> | undefined;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemsArray = this.itemService.getAll();
  }

  save(): void {
    console.log('in save item');
    this.itemService.createItem(this.item).subscribe(data => {
      console.log(data);
    });
  }

  loadItems(): void {
    this.itemService.getAll().subscribe(data => {
      console.log(data);
    });
  }
}

export interface Item {
  name: string;
  itemStatus: ItemStatus;
  description: string;
}

// {
//   "name" : "userProvided",
//   "itemStatus" : "IN_PROGRESS",
//   "description": "userProvided"
// }

export enum ItemStatus {
  TODO = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}


export interface ItemResponse {
  id: number;
  name: string;
  itemStatus: ItemStatus;
  description: string;
}
