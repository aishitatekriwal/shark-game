
var shark, sharkImg;
var fish ,fishImg, whale, whaleImg;
var fishGroup, whaleGroup;
var score;
var ground, invisibleGround, backgroundImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg,restartImg;


function preload()
{
  sharkImg = loadImage("sharkie.png");
  whaleImg = loadImage("whale.png");
  
  backgroundImg = loadImage("ocean.jpg");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  fishImg = loadImage("fish.png");
 
}

function setup()
{
  createCanvas(400,400);

  bg = createSprite(200,200,400,10);
  bg.velocityX = bg.width/2;
  bg.addImage(backgroundImg);
  bg.scale = 3;
  
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(200,160);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(200,200);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  fishGroup = new Group();
  whaleGroup = new Group();

  shark =  createSprite(85,340,20,20);
  shark.addImage(sharkImg);
  shark.scale = 0.075;
  
  score = 0;
}

function draw() 
{
  background(220);
  
  if(gameState === PLAY)
    {
      //making them invisible
      gameOver.visible = false;
      restart.visible = false;
      
      //move the ground
      bg.velocityX = -4 
      
      //scrolling ground
       if (bg.x < 0)
      {
      bg.x = bg.width/2;
      }
      
      //jump when space is pressed
      if(keyDown("space"))  
      {
       shark.velocityY = -12;
      }
  
      //gravity
      shark.velocityY = shark.velocityY + 0.8;
  
      spawnFish();
      spawnWhale();
  
      if(fishGroup.isTouching(shark))
        {
          score = score + 2;
          fishGroup.destroyEach();
        }
  
      if(whaleGroup.isTouching(shark))
      {
        gameState = END;
        whaleGroup.destroyEach();
        fishGroup.destroyEach();
      }
    }
   
   else if(gameState === END)
     {
        if(mousePressedOver(restart))
       {
         reset();
       }
  
      gameOver.visible = true;
      restart.visible = true;
     
      bg.velocityX = 0;
      fish.velocityY = 0;
    
      //set lifetime of the game objects so that they are never destroyed
     whaleGroup.setLifetimeEach(-1);
     fishGroup.setLifetimeEach(-1);
     
     whaleGroup.setVelocityXEach(0);
     fishGroup.setVelocityXEach(0);
       
     }
  
      shark.collide(invisibleGround);

      drawSprites();
  
  //display score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " +score,250,50);

}

function spawnFish()
{
  if(frameCount % 80 === 0)
    {
      fish = createSprite(400,100,10,10);
      fish.y = Math.round(random(120,200));
      fish.addImage(fishImg);
      fish.scale = 0.2;
      fish.lifetime = 400;
      fish.velocityX = -8;
      fishGroup.add(fish);
    }
}

function spawnWhale()
{
  if(frameCount % 250 === 0)
    {
      whale = createSprite(400,340,10,10);
      whale.addImage("whale",whaleImg);
      whale.scale = 0.4;
      whale.lifetime = 400;
      whaleGroup.add(whale);
      whale.velocityX = -7;
    }
}

function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  whaleGroup.destroyEach();
  fishGroup.destroyEach();
  score = 0;
}