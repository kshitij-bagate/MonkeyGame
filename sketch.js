var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  ground_image = loadImage("groun.jpg");
  sky_image = loadImage("sky.jpg");
}



function setup() {
  createCanvas(400, 400);
  
  bananasGroup=new Group();
  obstaclesGroup=new Group();
  ground = createSprite(300, 490, 400, 20)
  ground.addImage("Ground", ground_image);

  monkey = createSprite(30, 350, 10, 10);
  monkey.addAnimation("Monkey", monkey_running);
  monkey.scale = 0.100

  sky = createSprite(200, 30, 10, 10);
  sky.addImage("Sky", sky_image);
  sky.scale = 0.600;



  invisibleGround = createSprite(50, 390, 100, 20);
  invisibleGround.visible = false;

  survivalTime = 0;
}


function draw() {
  background(220);
  ground.velocityX = -2;
  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  sky.velocityX = -2;
  if (sky.x < 50) {
    sky.x = sky.width / 5;
  }
  survivalTime =  Math.ceil(frameCount / frameRate());
  if (keyDown("space") && monkey.y >= 300) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);
  monkey.depth=4;
  spawnBananas();
  spawnObstacles();
 
  drawSprites();
   fill("black");
  textSize(20);
  text("Survival Time "+survivalTime,100,50);
 
}


function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600, 125, 40, 10);
    banana.addImage(bananaImage);
    banana.velocityX = -6
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.10;
    banana.lifetime = 300;
    bananasGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(600, 350, 40, 10);
    obstacle.x = Math.round(random(80, 390));
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.10;
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    obstaclesGroup.add(obstacle);
  }
}