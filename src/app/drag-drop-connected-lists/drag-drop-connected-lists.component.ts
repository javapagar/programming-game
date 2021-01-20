import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { DropItem } from '../clases/drop-item';



@Component({
  selector: 'app-drag-drop-connected-lists',
  templateUrl: './drag-drop-connected-lists.component.html',
  styleUrls: ['./drag-drop-connected-lists.component.css']
})
export class DragDropConnectedListsComponent implements OnInit, AfterViewInit {
 
  actions : any[];
  actionsToExe : any [] =[];
  
  @ViewChildren ("accionitem", {read : ElementRef}) accionlist:  QueryList<ElementRef>;
  accionesEjecutables = [
    
  ];
  constructor() { }

  ngOnInit(): void {
    this.actions=[new DropItem("correr"), 
    new DropItem("saltar"), 
    new DropItem("abrir"),
    new DropItem("coger")]
  }
   ngAfterViewInit(): void {
     //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
     //Add 'implements AfterViewInit' to the class.
     //console.log(this.actionsToExe)
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
        
        if(event.previousContainer.id==="cdk-drop-list-0"){
          this.actionsToExe=event.container.data;
        }
        console.log(this.actionsToExe);
        console.log(event.previousContainer.id);
    }
    //this.ngAfterViewInit();
  }

  ejecutar(){
    this.actionsToExe.forEach(item => console.log(item?.label));
  }
}
