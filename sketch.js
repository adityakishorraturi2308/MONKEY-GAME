
var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacles, obstaclesImage;
var FoodGroup, obstaclesGroup;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");

 
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}



function setup() {
  createCanvas(400, 400);
  
  ground = createSprite(200, 395, 500, 10);
  console.log(ground.x);
  
  monkey = createSprite(50, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  
  
}


function draw() {
  background("lightcyan");
  
  monkey.scale = 0.1025;
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  if(keyDown("space")&& monkey.y >= 250) {
    monkey.velocityY = -15;
  }
  
  if(monkey.isTouching(obstaclesGroup)){
    monkey.lifetime = 1;
    obstacles.lifetime = 1;
    banana.lifetime = 1;
    ground.lifetime = 1;
    score.visible = false;
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
  }
  
  spawnFood();
  spawnObstacles();
  
  score = score + Math.round(getFrameRate()/60);
  textSize(20);
  textFont("rubik");
  text("Survival time: "+ score, 125,50);
  drawSprites();
  
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(180,280));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = monkey.depth - 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  //write code here to spawn the food
  if (frameCount % 200 === 0) {
    var obstacles = createSprite(600,349,40,10);
    obstacles.addImage(obstaclesImage);
    obstacles.setCollider("circle", 0, 0, 250);
    obstacles.scale = 0.21;
    obstacles.velocityX = -5;
    
     //assign lifetime to the variable
    obstacles.lifetime = 200;
    
    //adjust the depth
    obstacles.depth = monkey.depth;
    obstacles.depth = monkey.depth - 1;
    
    //add each cloud to the group
    obstaclesGroup.add(obstacles);
  }
}

