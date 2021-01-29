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

    this.loadMethods();
  }

  drop (event: CdkDragDrop<any[]>){
    if(event.previousContainer == event.container){
      moveItemInArray(event.previousContainer.data, event.previousIndex, event.currentIndex);
    }else{
      transferArrayItem(event.previousContainer.data, 
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        
        if(event.previousContainer.id === "cdk-drop-list-0"){
          this.actionsToExe=event.container.data;
        }
        console.log(this.actionsToExe);
        console.log(event.previousContainer.id);
    }
    this.loadMethods();
  }

  async ejecutar(){
    for (let index = 0; index < this.actionsToExe.length; index++) {
        this.actionService.setAction(this.actionsToExe[index]);
        await this.delay(1000);
        this.actionService.setAction(new DropItem(999,"stop"));
      
    }
  }

  delay(ms: number) :any {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private loadMethods():void{
    this.actions=[new DropItem(1,"avanzar",["arriba","abajo","izquierda","derecha"]), 
    new DropItem(2,"saltar"), 
    new DropItem(3,"abrir"),
    new DropItem(4,"coger")]
  }
}
