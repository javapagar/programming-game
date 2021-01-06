import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-drop-connected-lists',
  templateUrl: './drag-drop-connected-lists.component.html',
  styleUrls: ['./drag-drop-connected-lists.component.css']
})
export class DragDropConnectedListsComponent implements OnInit {
  acciones = [
    'Andar',
    'Abrir',
    'Girar',
    'mirar'
  ];

  accionesEjecutables = [
    
  ];
  constructor() { }

  ngOnInit(): void {
  }

  drop (event: CdkDragDrop<any[]>){
    if(event.previousContainer == event.container){
      moveItemInArray(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }else{
      transferArrayItem(event.previousContainer.data, 
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
