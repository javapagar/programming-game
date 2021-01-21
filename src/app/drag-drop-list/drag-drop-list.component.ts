import { DropItem } from './../clases/drop-item';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-drop-list',
  templateUrl: './drag-drop-list.component.html',
  styleUrls: ['./drag-drop-list.component.css']
})
export class DragDropListComponent implements OnInit {

  public ACCIONES =["correr", "saltar", "abrir","coger"];
  public actions : Array <any>;

  constructor() { }

  ngOnInit(): void {
    this.actions=[new DropItem(1,"correr"), 
    new DropItem(2,"saltar"), 
    new DropItem(3,"abrir"),
    new DropItem(4,"coger")]
  }

  drop(event:CdkDragDrop<any>){
    moveItemInArray(this.actions,event.previousIndex,event.currentIndex);
  }
}
