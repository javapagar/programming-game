import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent implements OnInit {

  public ACCIONES =["correr", "saltar", "abrir","coger"];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event:CdkDragDrop<any>){
    moveItemInArray(this.ACCIONES,event.previousIndex,event.currentIndex);
  }
}
