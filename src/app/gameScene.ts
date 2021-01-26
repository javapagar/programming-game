import * as Phaser from 'phaser';
import { DropItem } from './clases/drop-item';



export class GameScene extends Phaser.Scene{


    //ball:Phaser.GameObjects.Sprite;
    ball : Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    platform : Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    pushedKey: Phaser.Types.Input.Keyboard.CursorKeys;
    actionObject : DropItem;
    map : Phaser.Tilemaps.Tilemap;
    layer : Phaser.Tilemaps.TilemapLayer;
    action : number =0;
    moveTime:number=0;
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
        /*console.log('create method');
        let text = "Hola desde la escena inicial!";
        this.add.text(0, 0, text)*/
        //this.add.image(300,200,'background');//precarga del fondo
        this.map = this.add.tilemap('map');
        let terrain=this.map.addTilesetImage('terrain_atlas','terrain');

        let groundLayer= this.map.createLayer("ground",[terrain],0,0);
        let trackLayer=this.map.createLayer("track",[terrain],0,0);
        let wallLayer=this.map.createLayer("wall",[terrain],0,0);
        
        //this.add.image(200,200,'track');

        
        //bola con rebote
        this.ball=this.physics.add.sprite(0,165,'ball');
        //this.ball.body.setAllowGravity(false);
        //this.ball=this.add.sprite(200,200,'ball');
        this.ball.setCollideWorldBounds(true);//el marco del canvas hace de límite
        //this.ball.setBounce(1);//fuerza del rebote
        this.physics.add.collider(this.ball,wallLayer);

        //this.map.setCollisionByProperty({collides  : true});//lee la propiedad del json del mapa
        //this.map.setCollision(3,true);
        //wallLayer.setCollisionBetween(3370,3374)//funciona
        //recoge las pulsaciones de teclado
        this.pushedKey = this.input.keyboard.createCursorKeys();

       

    }

    update() {
        if(this.pushedKey.left.isDown){
            //this.ball?.setVelocityX(-100);//physics
            //this.ball.setPosition(this.ball.x-2,this.ball.y);
            this.moveLeft();
        }

        if(this.pushedKey.right.isDown){
            //this.ball?.setVelocityX(100);//Physics
            //this.ball.setPosition(this.ball.x+2,this.ball.y);
            this.moveRight();
        }

        if(this.pushedKey.down.isDown){
            //this.ball?.setVelocityX(0);
            //this.ball.setPosition(this.ball.x,this.ball.y+2);
            this.moveDown();
        }

        if(this.pushedKey.up.isDown){
            //this.ball.setPosition(this.ball.x,this.ball.y-2);
           // this.ball?.setVelocity(0,10);
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
        this.ball.setPosition(this.ball.x-2,this.ball.y);
        if(this.moveTime == 0) this.moveTime=10;
    }
    private moveRight(){
        this.ball.setPosition(this.ball.x+2,this.ball.y);
        if(this.moveTime == 0) this.moveTime=10;
    }
    private moveUp(){
        this.ball.setPosition(this.ball.x,this.ball.y-2);
        if(this.moveTime == 0) this.moveTime=10;
    }

    private moveDown(){
        this.ball.setPosition(this.ball.x,this.ball.y+2);
        if(this.moveTime == 0) this.moveTime=10;
    }

    private setStopAction(){
        this.actionObject=new DropItem(999,"stop");
        this.moveTime=0;
    }
}