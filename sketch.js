//score is not increasing
//the speed is not in increasing time to time
//also,my text is not displayed  in the serve state
var SERVE=2;
var PLAY=1;
var END=0;
var gameState=SERVE;

var zombie,zombieImg,girl,girlImg;
var road,roadImg,invisibleGround;
var obstaclesGroup,obstacle1,obstacle2,obstacle3,obstacle4;
var gameover,gameoverImg,gameoverSound,scoreSprite;
var score,backgroundMusic,replay,replayImg;
var birdsGroup,bird1,bird2;
var villainsGroup,villain1,villain2,villainDyingSound;
var kunai,kunaiImg,kunaiGroup,kunaiSound,kunaiThrowing;
var bg,girlIdle,zombieIdle,bgImg,girlIdleImg,zombieIdleImg;

function preload(){

    zombieImg=loadAnimation("zombie1.png","zombie2.png","zombie3.png","zombie4.png","zombie5.png","zombie6.png",
    "zombie7.png","zombie8.png","zombie9.png","zombie10.png");
    
    girlImg=loadAnimation("run.png","run1.png","run2.png","run3.png","run4.png","run5.png",
    "run6.png","run7.png","run8.png","run9.png");
    kunaiThrowing=loadAnimation("Throw__000.png","Throw__001.png","Throw__002.png","Throw__003.png","Throw__004.png",
    "Throw__005.png","Throw__006.png","Throw__007.png","Throw__008.png","Throw__009.png");

    roadImg=loadImage("road (2).jpg");
    gameoverImg=loadImage("game over.jpg");
    replayImg=loadImage("restart.png");
    gameoverSound=loadSound("game over sound.mp3");

    obstacle1=loadImage("rock1.png");
    obstacle2=loadImage("rock2.png");
    obstacle3=loadImage("rock3.png");
    obstacle4=loadImage("rock4.png");
    bird1=loadAnimation("spaceship01.png","spaceship01.png"); 
    bird2=loadAnimation("spaceship02.png","spaceship02.png");
    villain1=loadImage("villain3.png");
    villain2=loadImage("villain2.png");

    kunaiImg=loadImage("kunai.png");
    kunaiSound=loadSound("kunai sound.mp3");
    villainDyingSound=loadSound("villain dying.mp3");

    backgroundMusic=loadSound("background sound.mp3");

    bg=loadImage("black.jpg");
    girlIdle=loadImage("Idle__000.png");
    zombieIdle=loadImage("idle (14).png");

}

function setup() {
 createCanvas(900,500);

 zombie=createSprite(70,380,20,50);
 zombie.addAnimation("zombie",zombieImg);
 zombie.scale=.40;

 girl=createSprite(250,380,20,50);
 girl.addAnimation("girl",girlImg);
 girl.addAnimation("kunai",kunaiThrowing);
 girl.scale=.40;

 road=createSprite(200,250);
 road.addImage("scenery",roadImg);
 road.velocityX=-8;
 road.scale=4.5;
 
 invisibleGround = createSprite(500,480,1000,10);  
 invisibleGround.visible = false;

 gameover=createSprite(450,230);
 gameover.addImage("gameover",gameoverImg);
 gameover.scale=1;
 
 replay=createSprite(450,400);
 replay.addImage("restart",replayImg);
 replay.scale=.25;

 bgImg=createSprite(200,230);
 bgImg.addImage("start",bg);
zombieIdleImg=createSprite(70,250);
zombieIdleImg.addImage("zombie",zombieIdle);
girlIdleImg=createSprite(800,250);
girlIdleImg.addImage("girl",girlIdle);

 obstaclesGroup=createGroup();
 birdsGroup=createGroup();
 villainsGroup=createGroup();
 kunaiGroup=createGroup();

 score=0;

}

function draw() {
 
   background(180);
   drawSprites();
 
   
   if(road.x<0){
      road.x=road.width/1;
   }
 zombie.depth=road.depth;
 zombie.depth=zombie.depth+1;

 girl.depth=road.depth;
 girl.depth=girl.depth+1;

 score.depth=road.depth;
 score.depth=score.depth+1;

 birdsGroup.depth=road.depth;
 birdsGroup.depth=birdsGroup.depth+1;
 
 
if(gameState===SERVE){
 bgImg.visible=true;
 zombieIdleImg.visible=true;
 girlIdleImg.visible=true;

 stroke("white");
 fill("white");
textSize(50)
text("HOW TO PLAY",250,100) 
textSize(20)
text("Use up arrow to jump  and space key to use weapon",200,150);
 text("Avoid all the obstacles in you path ",300,200);
 text("Kill the monsters with your weapon",290,250)
 text("CLICK ENTER TO PROCEED",290,400);
 stroke("red");
 fill("red");
 textSize(50);
 text("GOOD LUCK!!",250,350)


 if(keyDown("enter")){
    gameState=PLAY;
 }

}


 else if(gameState===PLAY){

   bgImg.visible=false;
   zombieIdleImg.visible=false;
   girlIdleImg.visible=false;
  
gameover.visible=false;
replay.visible=false;

road.velocityX = -(10 + 3* score/300);
score = score + Math.round(getFrameRate()/60);
console.log(score)

if(keyDown("up_arrow")&& girl.y >= 10) {
   girl.velocityY = -16;
}

spawnObstacles();
spawnBirds();
spawnVillain();
restart();

girl.velocityY =girl.velocityY + 0.8;

if(keyDown("space")){
   girl.changeAnimation("kunai",kunaiThrowing);
   createKunai();
   kunaiSound.play();
   
}

if(kunaiGroup.isTouching(villainsGroup)){
villainsGroup.destroyEach();
kunaiGroup.destroyEach();
villainDyingSound.play();
girl.changeAnimation("girl",girlImg)
}

if(obstaclesGroup.isTouching(girl)||birdsGroup.isTouching(girl)||villainsGroup.isTouching(girl)){
   gameState=END;
   gameoverSound.play();
}


 }

else if(gameState===END){

   bgImg.visible=false;
   zombieIdleImg.visible=false;
   girlIdleImg.visible=false;
  
girl.changeAnimation("girl",girlImg);

   gameover.visible=true;
   replay.visible=true;
   
   road.velocityX=0;
   girl.velocityY=0;

   obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
   obstaclesGroup.destroyEach();

   birdsGroup.setLifetimeEach(-1);
   birdsGroup.setVelocityXEach(0);
   birdsGroup.destroyEach();

   villainsGroup.setLifetimeEach(-1);
   villainsGroup.setVelocityXEach(0);
   villainsGroup.destroyEach();

   kunaiGroup.setLifetimeEach(-1);
   kunaiGroup.setVelocityXEach(0);
   kunaiGroup.destroyEach(0);
   
   if(mousePressedOver(replay)) {
      restart();
      score=0;
    }
 }
 
 girl.collide(invisibleGround);

 stroke("black");
fill("black");
textSize(20)
text("Score: "+ score, 800,20);
 
}

function spawnObstacles(){
if(frameCount % 60===0){
  var obstacle = createSprite(900,450,20,50);
  obstacle.velocityX = -(6 + score/60);
  
  var rand =Math.round(random(1,4));
  switch(rand){

   case 1:obstacle.addImage(obstacle1);
   break;
   case 2:obstacle.addImage(obstacle2);
   break;
   case 3:obstacle.addImage(obstacle3);
   break;  
   case 4:obstacle.addImage(obstacle4);
   break;
   default: break;
}

  obstacle.scale=0.10;
  obstacle.lifetime=250;

  obstaclesGroup.add(obstacle);
  obstacle.setCollider("rectangle",0,0,20,20);
}


}

function spawnBirds(){
if(frameCount % 200===0){
  var bird=createSprite(0,50,20,20);
  bird.velocityX = (8 + score/300);

  var rand =Math.round(random(1,2));
  switch(rand){

   case 1:bird.addAnimation("bird",bird1);
   break;
   case 2:bird.addAnimation("bird",bird2);
   break;
   default:break;
     }
     bird.scale=0.15;
     bird.lifetime=250;

     birdsGroup.add(bird);

   }
                }

function spawnVillain(){
 if(frameCount %  250===0){
    var villain=createSprite(900,380,20,20);
    villain.velocityX=-(6 +  score/162);

    var rand=Math.round(random(1,2));
    switch(rand){

   case 1:villain.addImage(villain1);
   break;
   case 2:villain.addImage(villain2);
   break;
   default:break;

       }

       villain.scale=0.15;
       villain.lifetime=250;

       villainsGroup.add(villain);

 }
              }

function createKunai(){
 var kunai=createSprite(900,200,20,20);
 kunai.addImage("kunai",kunaiImg);
 kunai.x=girl.x;
 kunai.y=girl.y;
 kunai.velocityX=10;
 kunai.lifetime=150;
 kunai.scale=0.5;
 kunaiGroup.add(kunai);


}

function restart(){
   gameState=PLAY;
   replay.visible=false;
   gameover.visible=false;
  // score=0;
}