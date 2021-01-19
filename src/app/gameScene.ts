import * as Phaser from 'phaser';

export class GameScene extends Phaser.Scene{

    //ball?: Phaser.Physics.Arcade.Image;
    ball?:Phaser.GameObjects.Sprite;
    pushedKey?: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: 'gameScene' });
    }
     
    preload() {
        console.log('preload method');
        this.load.image('background','../assets/images/background.png');
        this.load.image('ball','../assets/images/ball.png');
    }
    
    create() {
        /*console.log('create method');
        let text = "Hola desde la escena inicial!";
        this.add.text(0, 0, text)*/
        this.add.image(300,200,'background');//precarga de la bola
        //bola con rebote
        //this.ball=this.physics.add.image(200,200,'ball');
        this.ball=this.add.sprite(200,200,'ball');
        
        //this.ball.setCollideWorldBounds(true);//el marco del canvas hace de límite
        //this.ball.setBounce(1);//fuerza del rebote
        
        
        //recoge las pulsaciones de teclado
        this.pushedKey = this.input.keyboard.createCursorKeys();
    }

    update() {
        if(this.pushedKey?.left.isDown){
            //this.ball?.setVelocityX(-100);//physics
            this.ball?.setPosition(this.ball.x-2,this.ball.y);
        }

        if(this.pushedKey?.right.isDown){
            //this.ball?.setVelocityX(100);//Physics
            this.ball?.setPosition(this.ball.x+2,this.ball.y);
        }

        if(this.pushedKey?.down.isDown){
            //this.ball?.setVelocityX(0);
            this.ball?.setPosition(this.ball.x,this.ball.y+2);
        }

        if(this.pushedKey?.up.isDown){
            this.ball?.setPosition(this.ball.x,this.ball.y-2);
           // this.ball?.setVelocity(0,10);
            
        }
    }

}