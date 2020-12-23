var ghost, door, climber, tower, ghostJumping, edges;
var doorImage, climberImage,ghostStandingImage, ghostJumpingImage, towerImage, gameOver, gameOverImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
 
function preload(){
  
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostStandingImage = loadImage("ghost-standing.png");
  ghostJumpingImage = loadImage("ghost-jumping.png");
  towerImage = loadImage("tower.png");
  gameOverImage = loadImage("pngtree-game-over-pixel-and-skull-png-image_2128139.jpg");
}

function setup(){
  createCanvas (600,600);
  ghost = createSprite(500, 400);
  ghost.addImage(ghostStandingImage);
  ghost.addImage(ghostJumpingImage);
  
  ghost.scale = 0.3;
  
  tower = createSprite(300,300);
  tower.addImage(towerImage);
  tower.depth = 0;
  tower.velocityY = 5;
  
  climberGroup = createGroup();
  doorGroup = createGroup();
  
  
  
  
}

function draw(){
  background("black");
  edges = createEdgeSprites();
  
       
  //text("score: " + score, 200,200);
  if(gameState === PLAY){
    
    score = score + Math.round(getFrameRate()/60);

    if(tower.y > 600){
  tower.y = 300;
  }
    
  
  if(keyWentDown("space")){
    ghost.velocityY = -15;
    
  }  
  
    
  
    ghost.addImage(ghostStandingImage);
    ghost.velocityY = ghost.velocityY + 0.8;
  ghost.velocityX = 0;
  if(keyDown("left")){
    ghost.velocityX = -5;
  }
  if(keyDown("right")){
    ghost.velocityX = 5;
  }
  if(climberGroup.isTouching(ghost)){
    gameState = END;
  }
    spawnDoors();
    ghost.collide(edges);
   if(ghost.collide(doorGroup)){
     ghost.velocityY = 0;
     ghost.addImage(ghostStandingImage);
   }
  }
  if(gameState === END){
   gameOver = createSprite(300,300);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 1.7;
   ghost.velocityX = 0;
   ghost.velocityY = 0;
   tower.velocityY = 0;
    climberGroup.setVelocityYEach(0);
    doorGroup.setVelocityYEach(0);
    if(keyWentDown("R")){
      gameState = PLAY; 
      
    }
  }
  drawSprites();
  
}

function spawnDoors(){
  if (frameCount % 60 === 0 || frameCount === 0){
  door = createSprite(200,97);
  door.addImage(doorImage);
  door.scale = 1 
  door.x = Math.round(random(120,440));
  door.lifetime = 300;
  door.velocityY = 5;
    
  climber = createSprite(200,160);
  climber.addImage(climberImage);
  climber.x = door.x;
  climber.scale = 0.75
  climber.lifetime = 300;
  climber.velocityY = 5; 
  climberGroup.add(climber);
    doorGroup.add(door);
  } 
}
