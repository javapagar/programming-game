import { GameScene } from './../gameScene';
import { Component, OnInit } from '@angular/core';
import * as Phaser from 'phaser';

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
  
  phaserGame: Phaser.Game | undefined;
  config: Phaser.Types.Core.GameConfig ;
  constructor() {
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
          gravity: { y: 100 }
        }
      }
    };
  }
  
  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
}
