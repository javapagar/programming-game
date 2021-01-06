import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropConnectedListsComponent } from './drag-drop-connected-lists.component';

describe('DragDropConnectedListsComponent', () => {
  let component: DragDropConnectedListsComponent;
  let fixture: ComponentFixture<DragDropConnectedListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropConnectedListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropConnectedListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
