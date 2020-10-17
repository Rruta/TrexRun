var trex,ground,invisibleGround,trexRun,groundImage,cloud,obstacles,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,cloudImage,restart,gameOver,restartImage,gameOverImage,obstaclesGroup,cloudsGroup,count,trexCollided;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload() {
  trexRun=loadAnimation("trex1.png","trex3.png","trex4.png")
  trexCollided=loadImage("trex_collided.png")
  groundImage=loadImage("ground2.png")
  obstacle1=loadImage("obstacle1.png")
  obstacle2=loadImage("obstacle2.png")
  obstacle3=loadImage("obstacle3.png")
  obstacle4=loadImage("obstacle4.png")
  obstacle5=loadImage("obstacle5.png")
  obstacle6=loadImage("obstacle6.png")
  cloudImage=loadImage("cloud.png")
  restartImage=loadImage("restart.png")
  gameOverImage=loadImage("gameOver.png")
}
function setup() {
  createCanvas(800, 400);
  trex=createSprite(150,350,20,20)
  trex.addAnimation("dino",trexRun)
  trex.scale=0.5
  ground=createSprite(400,370,800,20)
  invisibleGround=createSprite(400,380,800,15)
  ground.addImage("ground",groundImage)
  invisibleGround.visible=false
  ground.velocityX=-4
  ground.x=ground.width/2
  obstaclesGroup=new Group()
  cloudsGroup=new Group()
  count=0
  gameOver = createSprite(400,300);
  restart = createSprite(400,340);
gameOver.addImage("gameOver",gameOverImage);
gameOver.scale = 0.5;
restart.addImage("restart",restartImage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
  
  
}

function draw() {
  background("yellow");
  //move the ground
text("Score: "+ count, 250, 100);
  //console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*count/100);
    //scoring
    count = count + Math.round(getFrameRate()/60);
    
    if (count>0 && count%100 === 0){
      //playSound("checkPoint.mp3");
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 349){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclesGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
      //playSound("die.mp3");
    }
  }
  
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.addImage("trex_collided",trexCollided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("trex",trexRun);
  
  count = 0;
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,365,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   switch(rand){
     case 1:
       obstacle.addImage(obstacle1);
       break;
       case 2:
       obstacle.addImage(obstacle2);
       break;
       case 3:
       obstacle.addImage(obstacle3);
       break;
       case 4:
       obstacle.addImage(obstacle4);
       break;
       case 5:
       obstacle.addImage(obstacle5);
       break;
       case 6:
       obstacle.addImage(obstacle6);
       break;
       
     default:break;
     
   }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 133;
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(800,320,40,10);
    cloud.y = random(280,320);
    cloud.addImage("cloud",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 266;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
