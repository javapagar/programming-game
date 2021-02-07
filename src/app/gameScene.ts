import * as Phaser from 'phaser';
import { DropItem } from './clases/drop-item';



export class GameScene extends Phaser.Scene{


    //star:Phaser.GameObjects.Image;
    //ball : Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    star : Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    anna : Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    //dude : Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    pushedKey: Phaser.Types.Input.Keyboard.CursorKeys;
    actionObject : DropItem;
    map : Phaser.Tilemaps.Tilemap;
    layer : Phaser.Tilemaps.TilemapLayer;
    action : number =0;
    moveTime : number=0;
    velocity : number = 50;
    timeMoving : number = 20;
    catchStar : number =1;
    constructor() {
        super({ key: 'gameScene' });
        this.setStopAction();
    }
     
    preload() {
        console.log('preload method');
        //this.load.image('track','../assets/images/track_1.png');
        this.load.image('terrain','../assets/images/terrain_atlas.png')
        this.load.tilemapTiledJSON('map','../assets/images/map1.json')
        this.load.spritesheet('anna','../assets/images/Male.png',{
            frameWidth: 32,
            frameHeight: 32
        })
        /*this.load.spritesheet('anna','../assets/images/anna.png',{
            frameWidth: 64,
            frameHeight: 64
        })*/
        this.load.image('star','../assets/images/star.png');
    }
    
    create() {

        this.map=this.make.tilemap({key: 'map'});
        let terrain=this.map.addTilesetImage('terrain_atlas','terrain');

        let groundLayer= this.map.createLayer("ground",[terrain],0,0);
        let trackLayer=this.map.createLayer("track",[terrain],0,0);
        let wallLayer=this.map.createLayer("wall",[terrain],0,0);
        
        this.add.grid(160, 160, 320, 320, 16, 16, undefined,undefined,0x00ffffff,200)
        //0x00b9f2

        wallLayer.setCollisionByProperty({collides: true});
        

        //Colerea los muros para el debug
       /* const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.map.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });*/
        
        //this.ball=this.physics.add.sprite(30,165,'ball');
        //this.ball.setCollideWorldBounds(true);//el marco del canvas hace de límite
        //this.ball.setBounce(1);//fuerza del rebote
        /*this.physics.add.collider(this.ball,wallLayer,()=>{
            this.setStopAction();
        });*/
        
        this.star=this.physics.add.sprite(280,232, "star")
        //let rectangle = this.add.rectangle(280,230,10,10)
        this.star.setScale(.8)
       

        //animaciones del dude

        /*this.dude = this.physics.add.sprite(50,165,"player")

        this.physics.add.collider(this.dude,wallLayer,()=>{
            this.setStopAction();
        });
    
        this.anims.create({
                key: "right",
                frameRate: 10,
                frames : this.anims.generateFrameNumbers("player",{ start: 6, end: 8}),
                repeat : -1
            })
        this.anims.create({
                key: "stop",
                frameRate: 20,
                frames : [{ key: "player", frame :7}]
               
            })
            this.anims.create({
                key: "left",
                frameRate: 10,
                frames : this.anims.generateFrameNumbers("player",{ start: 3, end: 5}),
                repeat : -1
            })*/
       //animaciones

       this.anna = this.physics.add.sprite(25,160,"anna")
       this.anna.body.setSize(10,32,true)

       this.physics.add.collider(this.anna,wallLayer,()=>{
           this.setStopAction();
       });
   
        this.physics.add.overlap(this.anna,this.star,() =>{
            this.pickUpStar()
        })
       this.anims.create({
               key: "rightAnna",
               frameRate: 10,
               frames : this.anims.generateFrameNumbers("anna",{ start: 6, end: 8}),
               repeat : -1
           })
       this.anims.create({
               key: "stopAnna",
               frameRate: 20,
               frames : [{ key: "anna", frame :7}]
              
           })
           this.anims.create({
               key: "leftAnna",
               frameRate: 10,
               frames : this.anims.generateFrameNumbers("anna",{ start: 3, end: 5}),
               repeat : -1
           })
           this.anims.create({
            key: "up",
            frameRate: 10,
            frames : this.anims.generateFrameNumbers("anna",{ start: 9, end: 11}),
            repeat : -1
        })
        this.anims.create({
            key: "down",
            frameRate: 10,
            frames : this.anims.generateFrameNumbers("anna",{ start: 0, end: 2}),
            repeat : -1
        })
        //recoge las pulsaciones de teclado
        this.pushedKey = this.input.keyboard.createCursorKeys();


    }

    update() {
      
        if(this.pushedKey.left.isDown){
            //this.ball.setGravity(0.1)
            this.moveLeft();
            
        }

        if(this.pushedKey.right.isDown){
            //this.ball.setGravity(0.1)
            this.moveRight();
        }

        if(this.pushedKey.down.isDown){
            //this.ball.setGravity(0.1)
            this.moveDown();
        }

        if(this.pushedKey.up.isDown){
           //this.ball.setGravity(0.1)
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
            if(this.moveTime == 0 || this.actionObject.label == "stop"){
                this.setStopAction();
                this.anna.setVelocity(0,0)
                //this.anna.anims.play("stopAnna",true)
                
            }
            
            //console.log(this.moveTime);
        }else if(this.actionObject.id ==2 ){
           
        }
        
        if(this.actionObject.label == "stop"){
            //this.dude.anims.play("stop",true)
            this.anna.setVelocity(0,0)
            this.anna.anims.play("stopAnna",true)
            if(this.catchStar > 0){
                //console.log("no tengo todas las estrellas")
            }else{
                //console.log("tengo estrella")
            }
        }
        
    }

    private moveLeft(){
        //this.ball.setVelocity(this.velocity * -1,0);
        /*this.dude.setVelocity(this.velocity * -1,0);
        this.dude.anims.play("left",true)*/
        this.anna.setVelocity(this.velocity * -1,0);
        this.anna.play("leftAnna",true)
        if(this.moveTime == 0) this.moveTime = this.timeMoving;
    }
    private moveRight(){
        //this.ball.setVelocity(this.velocity,0);
        /*this.dude.setVelocity(this.velocity,0);
        this.dude.anims.play("right",true)*/
        this.anna.setVelocity(this.velocity,0);
        this.anna.anims.play("rightAnna",true)
        if(this.moveTime == 0) this.moveTime = this.timeMoving;
    }
    private moveUp(){
        //this.ball.setVelocity(0,this.velocity * -1);
        //if(this.moveTime == 0) this.moveTime=10;
        this.anna.setVelocity(0,this.velocity *-1)
        this.anna.play("up",true)
        if(this.moveTime == 0) this.moveTime = this.timeMoving;
    }

    private moveDown(){
        //this.ball.setVelocity(0,this.velocity);
        //if(this.moveTime == 0) this.moveTime=10;
        this.anna.setVelocity(0,this.velocity);
        this.anna.play("down",true)
        if(this.moveTime == 0) this.moveTime = this.timeMoving;
    }

    private setStopAction(){
        //this.anna.anims.play("stop",true)
        this.actionObject=new DropItem(999,"stop");
        this.moveTime=0;
    }

    private pickUpStar(){
        this.star.destroy()
        this.catchStar --
        
       
    }
}