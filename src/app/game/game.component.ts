import { GameScene } from './../gameScene';
import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';

import { ActionService } from '../services/action.service';
import { Observable } from 'rxjs';
import { DropItem } from '../clases/drop-item';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  create() {
    console.log('create method');
    let text = "Hello from scene!";
    this.add.text(0, 0, text)
  }
  preload() {
    console.log('preload method');
  }
  update() {
    console.log('update method');
  }
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig ;
  
  action : DropItem;
  action$ : Observable<DropItem>;

  levelScene : number=0;
  constructor(private actionService : ActionService) {
    this.config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        //parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 600,
        height: 400
      },
      scene: [ GameScene, MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0.1 }
        }
      }
    };
  }
  

  ngOnInit() {
    this.action$ = this.actionService.getAction$();
    this.action$.subscribe(action => {
      this.action = action;
      this.executeAction();
    });
    this.phaserGame = new Phaser.Game(this.config);
    
  }


  executeAction(){
    switch (this.action.label) {
      case "avanzar":
        console.log("avanza")
        //this.phaserGame.scene.scenes[this.levelScene].action=1;
        this.phaserGame.scene.scenes[this.levelScene].actionObject = this.action;
        break;
      case "saltar":
        console.log("salta")
        break;
      default:
        console.log(this.action.label)
        this.phaserGame.scene.scenes[this.levelScene].action=0;
        break;
    }
    
  }
}
