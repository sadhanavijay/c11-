var road;
var runner;
var invisible1,invisible2;
var bomb;
var drink;
var score = 0;
var gameState = 'serve'
var bombGroup
var drinkGroup


function preload(){
  //pre-load images
  runner_1 = loadAnimation('Runner-1.png','Runner-2.png')
  path = loadImage('path.png')
  bomb_1 = loadImage('bomb.png')
  drink_1 = loadImage('energyDrink.png')

}

function setup(){
  createCanvas(445,400);
  //create sprites here

  road = createSprite(200,200)
  road.addImage(path)
  road.scale = 0.999;
  path.velocityY=4;

  runner = createSprite(200,300,10,10);
  runner.addAnimation('runner',runner_1)
  
  runner.scale = 0.1

  invisible1 = createSprite(-20,0,140,800)
  invisible2 = createSprite(443,0,166,800)
  invisible1.visible = false
  invisible2.visible = false

  bombGroup = new Group()
  drinkGroup = new Group()

}


function draw() {
  background(0);

  runner.setCollider('circle',0,0,555)

  if (gameState==='serve'){
  textSize(18);
  fill('white');
  text('Press',370,50);

  textSize(18);
  fill('white');
  text('Space',370,100);
  
  textSize(18);
  fill('white');
  text('To',380,150);

  textSize(18);
  fill('white');
  text('Start',375,200);
  }

  if (keyDown('space')&&gameState==='serve'){
    gameState='play'
  }

  if (gameState==='play'){
    gameplay();
    textSize(18);
    fill('white');
    text('Score = '+score,355,200);
  }

  if (keyDown('right')&&gameState==='play'){
    runner.x=runner.x-50
  }
  if (keyDown('left'&&gameState==='play')){
    runner.x=runner.x+50
  }

  if (gameState==='end'){
    runner.velocityx=0
    road.velocityY = 0

    textSize(18);
    fill('white');
    text('You Lost',355,100);
    text('Press',360,210)
    text('ctrl + r to',355,230)
    text('restart',360,250)
    text('Score is '+score,355,350)

  }

  if (gameState==='end'&&keyDown('r')){
    gameState='play'
  }
  if (path.y>400){
    path.y=height/2
  }
  
  drawSprites();

}

function spawnBomb(){

  randx = Math.round(random(70,330))
  randy = Math.round(random(-100,-20))

  if (frameCount%60===0 || frameCount%80===0){
    bomb = createSprite(randx,randy)
    bomb.addImage(bomb_1)
    bomb.scale = 0.08
    bomb.velocityY = 9
    bomb.lifetime = 210
    bombGroup.add(bomb)

  }
}


function spawnDrink(){
  randx = Math.round(random(70,330))
  randy = Math.round(random(-100,-20))

  if (frameCount%100===0){
    drink = createSprite(randx,randy)
    drink.addImage(drink_1)
    drink.scale = 0.1
    drink.velocityY = 9
    drink.lifetime = 210
    drinkGroup.add(drink)

  }
}

function kill(){
  if (bomb.collide(runner)){

  }
}

function gameplay(){

  

  road.velocityY = 5
  if (road.y>400){
    road.y = road.width/2
  }

  if (runner.isTouching(bombGroup)){
    gameState='end'
  }

  if (runner.isTouching(drinkGroup)){
    drink.destroy()
    score+=5

  }

  runner.x = mouseX
  runner.collide(invisible1)
  runner.collide(invisible2)

  spawnBomb();
  spawnDrink();



}
