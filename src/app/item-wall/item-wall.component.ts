import {Component, Inject, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ItemResponse, ItemStatus} from '../create-item/create-item.component';
import {ItemService} from '../item.service';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-item-wall',
  templateUrl: './item-wall.component.html',
  styleUrls: ['./item-wall.component.css']
})
export class ItemWallComponent implements OnInit {

  itemToDoResponse: ItemResponse[] = [];
  itemInProgressResponse: ItemResponse[] = [];
  itemDoneResponse: ItemResponse[] = [];

  ngOnInit(): void {
    this.getItemData();
  }

  constructor(private itemService: ItemService, private toastrService: ToastrService,
              private matDialog: MatDialog) { }

  getItemData(): void {
    this.itemToDoResponse = [];
    this.itemInProgressResponse = [];
    this.itemDoneResponse = [];
    this.itemService.getAll().subscribe((data: ItemResponse[]) => {
      data.forEach( (item: ItemResponse) => {
        if (item.itemStatus === ItemStatus.TODO) {
          this.itemToDoResponse.push(item);
        } else if (item.itemStatus === ItemStatus.IN_PROGRESS) {
          this.itemInProgressResponse.push(item);
        } else {
          this.itemDoneResponse.push(item);
        }
      });
      this.toastrService.success('Succesfully received data');
      console.log('TODO:', this.itemToDoResponse);
      console.log('IN_RORGRESS', this.itemInProgressResponse);
      console.log('DONE', this.itemDoneResponse);
    }, error => {
      this.toastrService.error('Something went wrong');
    });
  }

  drop(event: CdkDragDrop<ItemResponse[]>): void {
    console.log('test');
    console.log(event);
    // event.previousContainer este containerul din care vrem sa mutam elementul
    // event.container este containerul unde vrem sa ducem elementul
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // ajungem pe acest branch cand mutam elemente dintr-un container in altul ( de exemplu din TODO in Progress);
      const draggedItemResponse: ItemResponse = event.previousContainer.data[event.previousIndex];
      console.log('Moving element from' + event.previousContainer.id + ' to ' + event.container.id);
      console.log('Dragged item response is', draggedItemResponse);

      // apelam metoda cu obiectul pe care il schimbam si id-ul container-ului in care o sa ajunga
      this.changeStatus(draggedItemResponse, event.container.id);
      this.itemService.updateStatus(draggedItemResponse.id, draggedItemResponse.itemStatus).subscribe( (data: ItemResponse) => {

        this.itemDoneResponse.forEach( (el: ItemResponse) => {
          if (el.id === data.id) {
            el.duration = data.duration;
          }
        });

        this.itemInProgressResponse.forEach( (el: ItemResponse) => {
          if (el.id === data.id) {
            el.duration = data.duration;
          }
        });

        this.itemToDoResponse.forEach( (el: ItemResponse) => {
          if (el.id === data.id) {
            el.duration = data.duration;
          }
        });

        this.toastrService.info('Status updated succesfully');
      }, error => {
        this.toastrService.error(error);
      });
      console.log('Dragged item after change status', draggedItemResponse);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  changeStatus(item: ItemResponse, containerId: string): ItemResponse {
    if (containerId === 'todo') {
      item.itemStatus = ItemStatus.TODO;
    } else if ( containerId === 'in_progress') {
      item.itemStatus = ItemStatus.IN_PROGRESS;
    } else {
      item.itemStatus = ItemStatus.DONE;
    }
    return item;
  }

  showDescription(item: ItemResponse): void {
    this.matDialog.open(ItemDescriptionDialogComponent, {
      data: {
        description: item.description,
        duration: item.duration
      }
    });
  }

  showDeleteDialog(id: number): void {
    console.log('in delete dialog method');
    const dialog = this.matDialog.open(ItemDeleteDialogComponent, {
      data: {
        itemId: id
      }
    });
    dialog.afterClosed().subscribe(el => {
      this.getItemData();
    });
  }
}

@Component({
  selector: 'app-item-description-dialog',
  templateUrl: 'item-description-dialog.html'
  }
)
export class ItemDescriptionDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
    selector: 'app-item-delete-dialog',
    templateUrl: 'item-delete-dialog.html'
  }
)
export class ItemDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private itemService: ItemService, private toastrService: ToastrService) {}

  handleDelete(): void {
    /**
     * subscribe - rezulta 2 posibile actiuni
     * 1. actiunea de succes
     * 2. actiune de eroare
     *
     * .subscribe( (data-de-la-api) => {
     *  // cum se proceseaza datele
     * }, (eroare-de-la-api) => {
     *   // cum se proceseaza eroarea
     * })
     */
    this.itemService.deleteItem(this.data.itemId).subscribe( (apiData: any) => {
      this.toastrService.success('Status from API is ' + apiData);
    }, error => {
      this.toastrService.error('Status from API is ' + error);
    });
  }

  handleClose(): void {
    console.log('clicked on close');
  }
}

