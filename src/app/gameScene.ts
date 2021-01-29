import * as Phaser from 'phaser';
import { DropItem } from './clases/drop-item';



export class GameScene extends Phaser.Scene{


    //ball:Phaser.GameObjects.Sprite;
    //ball : Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    ball : Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    pushedKey: Phaser.Types.Input.Keyboard.CursorKeys;
    actionObject : DropItem;
    map : Phaser.Tilemaps.Tilemap;
    layer : Phaser.Tilemaps.TilemapLayer;
    action : number =0;
    moveTime:number=0;
    velocity : number = 200;
    constructor() {
        super({ key: 'gameScene' });
        this.setStopAction();
    }
     
    preload() {
        console.log('preload method');
        //this.load.image('track','../assets/images/track_1.png');
        this.load.image('terrain','../assets/images/terrain_atlas.png')
        this.load.tilemapTiledJSON('map','../assets/images/map1.json')
        this.load.image('ball','../assets/images/ball.png');
    }
    
    create() {
        
        this.map=this.make.tilemap({key: 'map'});
        let terrain=this.map.addTilesetImage('terrain_atlas','terrain');

        let groundLayer= this.map.createLayer("ground",[terrain],0,0);
        let trackLayer=this.map.createLayer("track",[terrain],0,0);
        let wallLayer=this.map.createLayer("wall",[terrain],0,0);
        
        wallLayer.setCollisionByProperty({collides: true});
        
        //Colerea los muros para el debug
       /* const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.map.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/
        
        this.ball=this.physics.add.sprite(30,165,'ball');
        this.ball.setCollideWorldBounds(true);//el marco del canvas hace de límite
        //this.ball.setBounce(1);//fuerza del rebote
        this.physics.add.collider(this.ball,wallLayer,()=>{
            this.setStopAction();
        });


        //recoge las pulsaciones de teclado
        this.pushedKey = this.input.keyboard.createCursorKeys();

       

    }

    update() {
        //this.ball.setGravity(0);
        this.ball.body.setVelocity(0,0);
        if(this.pushedKey.left.isDown){
            this.ball.setGravity(0.1)
            this.moveLeft();
            
        }

        if(this.pushedKey.right.isDown){
            this.ball.setGravity(0.1)
            this.moveRight();
        }

        if(this.pushedKey.down.isDown){
            this.ball.setGravity(0.1)
            this.moveDown();
        }

        if(this.pushedKey.up.isDown){
           this.ball.setGravity(0.1)
           this.moveUp();
           
        }
        
        if (this.actionObject.id == 1){
            console.log(this.actionObject.paramSelected)
            if(this.actionObject.paramSelected === "izquierda"){
                this.moveLeft();
                
            }else if(this.actionObject.paramSelected === "derecha"){
                this.moveRight();
            }else if(this.actionObject.paramSelected === "arriba"){
                this.moveUp();
            }else if(this.actionObject.paramSelected === "abajo"){
                this.moveDown();
            }
            
            this.moveTime --;
            if(this.moveTime == 0){
                this.setStopAction();
            }
            
            //console.log(this.moveTime);
        }else if(this.actionObject.id ==2){
           
        }
        
        
    }

    private moveLeft(){
        this.ball.setVelocity(this.velocity * -1,0);
        //if(this.moveTime == 0) this.moveTime=10;
    }
    private moveRight(){
        this.ball.setVelocity(this.velocity,0);
        //if(this.moveTime == 0) this.moveTime=10;
    }
    private moveUp(){
        this.ball.setVelocity(0,this.velocity * -1);
        //if(this.moveTime == 0) this.moveTime=10;
    }

    private moveDown(){
        this.ball.setVelocity(0,this.velocity);
        //if(this.moveTime == 0) this.moveTime=10;
    }

    private setStopAction(){
        this.actionObject=new DropItem(999,"stop");
        this.moveTime=0;
    }


}