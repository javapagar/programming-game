import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';



@Component({
  selector: 'app-drag-drop-connected-lists',
  templateUrl: './drag-drop-connected-lists.component.html',
  styleUrls: ['./drag-drop-connected-lists.component.css']
})
export class DragDropConnectedListsComponent implements OnInit, AfterViewInit {
  acciones = [
    'Andar',
    'Abrir',
    'Girar',
    'mirar'
  ];
  @ViewChildren ("accionitem", {read : ElementRef}) accionlist:  QueryList<ElementRef>;
  accionesEjecutables = [
    
  ];
  constructor() { }

  ngOnInit(): void {
  }
   ngAfterViewInit(): void {
     //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
     //Add 'implements AfterViewInit' to the class.
     console.log(this.accionlist)
     //this.accionlist.nativeElement.focus();
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
    //this.ngAfterViewInit();
  }

  ejecutar(){
    console.log(this.accionlist.first.nativeElement.value);
  }
}
