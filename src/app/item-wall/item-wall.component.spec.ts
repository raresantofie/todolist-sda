import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemWallComponent } from './item-wall.component';

describe('ItemWallComponent', () => {
  let component: ItemWallComponent;
  let fixture: ComponentFixture<ItemWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
