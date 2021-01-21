import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {  Component,  OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DropItem } from '../clases/drop-item';
import { ActionService } from '../services/action.service';



@Component({
  selector: 'app-drag-drop-connected-lists',
  templateUrl: './drag-drop-connected-lists.component.html',
  styleUrls: ['./drag-drop-connected-lists.component.css']
})
export class DragDropConnectedListsComponent implements OnInit {
 
  actions : any[];
  actionsToExe : any [] =[];
  
 
  constructor(private actionService : ActionService) { }

  ngOnInit(): void {

    this.actions=[new DropItem("correr"), 
    new DropItem("saltar"), 
    new DropItem("abrir"),
    new DropItem("coger")]
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
    this.actionsToExe.forEach(item => {
          this.actionService.setAction(item);
    });
    
  }
}
