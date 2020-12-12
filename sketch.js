
var monkey,monkey_running,invisibleground,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,jumpsound;
var score=0,survivaltime=0,backgroundimage,lives=2;
var PLAY=0,END=1,gamestate=0;

function preload()
{
  monkey_running =      loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jumpsound = loadSound("jump.mp3")
  backgroundimage = loadImage("jungle.jpg")
}

function setup() 
{
  createCanvas(windowWidth,windowHeight)
  background("white")
  
  ground = createSprite(width/2+200,height/2)
  ground.addImage(backgroundimage)
  ground.velocityX = -4
  ground.scale = 1.6
  
  monkey = createSprite(50,315)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale = 0.2
  
  invisibleground = createSprite(monkey.x,height-50,400,5)
  invisibleground.visible = false
  
  obstacleGroup = createGroup()
  FoodGroup = createGroup()

}


function draw() 
{
  background("white") 
  drawSprites()
  
  if(gamestate == PLAY)
  {  
    //jump
    if(keyDown('space'))
    {
      monkey.velocityY = -15
      jumpsound.play()
    }

    if(ground.x < 300) 
    {
      ground.x = ground.width/2+200    
    }

    if(monkey.isTouching(obstacleGroup))
    {
      obstacleGroup.destroyEach()
      monkey.scale = 0.2
      lives = lives-1
    } 
   
    //gravity
    monkey.velocityY = monkey.velocityY+1

    if(monkey.isTouching(FoodGroup))
    {
      score = score+1
      FoodGroup.destroyEach()
    }  
  
    obstacles()
    bananas()
    
    survivaltime = Math.ceil(frameCount/frameRate())
    
    if(lives == 0)
     {
       gamestate = END
     } 
  }  
  
  else if(gamestate == END)
  {
    textSize(20)
    text("YOU LOSE",width/2-50,height/2)
    ground.velocityX = 0
  }  
  monkey.collide(invisibleground)
  
  textSize(12)
  text("SCORE : " + score,width-100,height-575)
  
  text("Survival Time :" + survivaltime,width-125,height-550)
  text("Lives : " + lives,width-85,height-525)
  
  switch(score)
  {
    case 10 : player.scale = 0.22
    break   
    case 20 : player.scale = 0.24
    break
    case 30 : player.scale = 0.26
    break
    case 40 : player.scale = 0.28
    break
    case 50 : player.scale = 0.3
    break
    default: break;
  } 
}

function obstacles()
{
  if(frameCount % 300 == 0)
  {
    obstacle = createSprite(width,height-50)
    obstacle.velocityX = -(4+score/4)
    obstacle.addImage(obstaceImage)
    obstacle.scale = 0.1
    obstacle.lifetime = 400
    obstacleGroup.add(obstacle)
  }
}

function bananas()
{
  if(frameCount % 80 == 0)
  {
    banana = createSprite(width,Math.round(random(height-200,height-700)),10,10)
    banana.velocityX = -(8+score/4)
    banana.addImage(bananaImage)
    banana.scale = 0.1
    banana.lifetime = 400
    FoodGroup.add(banana)
  }
}




