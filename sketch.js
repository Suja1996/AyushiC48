var spaceship,ship2, backgroundImage;
var aliens,aliens2;
var score=0
var life=3;
var PLAY=1;
var END=0;
var shipScale=0.5
var gameState = PLAY;
var level=1
var speed=0 , alienSpeed=2
var count=0,alienCount=0,kill=0,alienPos=0;
var lifePowerups,shipPowerups,speedPowerups

var backgroundSprite;
function preload(){
  bgImage2=loadImage("images/bgImage2.png")
  bgImage3=loadImage("images/bgImage7.png")
  bgImage4=loadImage("images/bgImage8.png")
  ship2=loadImage("images/spaceShip2.png")
  //ship2.scale=0.5
  ship1=loadImage("images/spaceShip3.png")
ship3=loadImage("images/ship4.png")
ship4=loadImage("images/ship5.png")
ship5=loadImage("images/ship6.png")
ship6=loadImage("images/ship7.png")
ship7=loadImage("images/ship8.png")
ship8=loadImage("images/ship9.png")
ship9=loadImage("images/ship2.png")
  //ship1.scale=0.5
  bullet=loadSound("images/bullet.wav")
  coinSound=loadSound("images/coins.wav")
  bombSound=loadSound("images/bomb.wav")
explosion =loadAnimation("images/explo1.png","images/explo2.png","images/explo3.png","images/explo4.png","images/explo5.png")
}
function setup() {
   //make it as display width
  createCanvas(windowWidth, windowHeight);
 
  //create class and object
  bg = new backgroundI(
    width / 2,
    height / 2,
    width,
    height * 4
  );
  spaceship = new spaceShip(width / 2, height - 10, 50, 50);
 
  dangerzone= createSprite(width/2,spaceship.sprite.y+height/1.8,width,height)
  dangerzone.visible=false
  shipImage=ship2
bulletGroup=new Group()
alienGroup= new Group()
alien2Group= new Group()
lifePowerupGroup=new Group(); 
shipPowerupGroup=new Group(); 
bombGroup=new Group(); 
 scorePowerupGroup=new Group();
 speedPowerupsGroup=new Group();
}
function draw() {
  
  if(gameState===PLAY){
  background(rgb(198, 135, 103));

   //display bg and spaceship
  
  spaceship.display(shipImage,shipScale);

if(bulletGroup.isTouching(alienGroup)){
  score+=10
  alienGroup.destroyEach();
  bullet.play();
 // Bullets.addAnimation((""))
 // bulletGroup.destroyEach();
}
if(bulletGroup.isTouching(alien2Group)){
  score+=10
  alien2Group.destroyEach();
  bullet.play();
 // Bullets.addAnimation((""))
 // bulletGroup.destroyEach();
}
if(spaceship.sprite.isTouching(scorePowerupGroup)){
  score+=10
  alienGroup.destroyEach();
 }
if(alienGroup.isTouching(spaceship.sprite)){
life--
alienGroup.destroyEach();
}
if(spaceship.sprite.isTouching(shipPowerupGroup)){
  rand=Math.round(random(1,10))
  shipPowerupGroup.destroyEach();
console.log(rand)
  switch (rand){
    case 1:shipImage=ship1
    shipScale=0.5
      break;
      case 2:shipImage=ship2
      shipScale=0.5
      break;
      case 3:shipImage=ship3
      shipScale=0.5
      break;
      case 4:shipImage=ship4
      shipScale=0.5
      break;
      case 5:shipImage=ship5
      shipScale=0.5
      break;
      case 6:shipImage=ship6
      shipScale=0.5
      break;
      case 7:shipImage=ship7
      shipScale=0.5
      break;
      case 8:shipImage=ship8
      shipScale=0.5
      break;
      case 9:shipImage=ship9
      shipScale=0.5
      break;
      default:
        break;
      
  }
}
//set camera positions
  camera.position.x = width / 2;
   camera.position.y = spaceship.sprite.y-width/2+500;
  
 if(score>50 && level==1){
level++
score+=20
 }
 if(level==2){
   bg.display(bgImage3)
   if(score>100){
    level++
  }
 }
else if(level===1){
  bg.display(bgImage2)
 
}
else if(level===4){
  bg.display(bgImage2)
  if(count===0){
  spaceship.sprite.velocityY=0;
  spaceShipPosition=spaceship.sprite.y
  camera.position.y=spaceShipPosition-width/6
  }
  count++
  dangerzone.visible=true;
  dangerzone.shapeColor="yellow"
  dangerzone.y-=1
  spaceship.sprite.y-=1;
  if(dangerzone.y<spaceShipPosition-height/2+height/6){
    gameState=END;
  }
}
else if(level===3){
  console.log("level is 3")
  bg.display(bgImage4)
alienPos++
  if(alienCount===0){
    console.log("creating big alien")
  bigAlien = createSprite(width/2,camera.position.y-height/3,100,100)
  bigAlien.velocityX=5
  alienCount++
  }
  bigAlien.y=camera.position.y-height/3 + alienPos/4
  if(bigAlien.x>width){
    bigAlien.velocityX=-5
  }
  
  if(bigAlien.x<0){
    bigAlien.velocityX=+5
  }
  if(bulletGroup.isTouching(bigAlien)){
    kill++
if(kill===10){
bigAlien.destroy();
console.log("killed big alien")
gameState=END
}
  }
}
  if (bg.sprite.y < camera.position.y - height / 2) {
    bg.sprite.y = camera.position.y;
  }
  if(spaceship.sprite.isTouching(lifePowerupGroup)){
    life++
    lifePowerupGroup.destroyEach();
  }
  if(spaceship.sprite.isTouching(bombGroup)){
    //life--
   // bombGroup.destroyEach();
    bombs.sprite.changeAnimation("bombExplosion",bombs.Animation)
    bombSound.play();
    //gameState=END
  }
  if(spaceship.sprite.isTouching(scorePowerupGroup)){
    score+=1
    scorePowerupGroup.destroyEach();
    coinSound.play();
  }
  if(spaceship.sprite.isTouching(speedPowerupsGroup)){
    speedPowerupsGroup.destroyEach();
    speed=1;
  }
 //right and left moves of spaceship
 if (keyDown("left") && spaceship.sprite.x > 100) {
  spaceship.sprite.x = spaceship.sprite.x - 20;
}
if (keyDown("right") && spaceship.sprite.x< width - 100) {
  spaceship.sprite.x = spaceship.sprite.x+ 20;
}
if(level===1||level===2){
spawnAliens();
spawn2Aliens();
spawnlifePowerups();
spawnShipPowerups();
spawnscorePowerups();
spawnspeedPowerups();
spawnBombs();
}
fireBullets();
drawSprites();
  fill("yellow")
  textSize(20)
  text("score" +score,width-200,camera.position.y-height/2+50)

  fill("yellow")
  textSize(20)
  text("lives" +life,width-400,camera.position.y-height/2+50)
  text("level:" +level,width-600,camera.position.y-height/2+50)
  if(life==0){
    gameState=END
  }
}
if (gameState===END){
  textSize(30)
  fill("blue")
  console.log("end State")
  text("Game Over!!",width / 2, camera.position.y)
}
}
function spawnAliens(){
  if(frameCount%140===0){
    if(speed===1){
      alienSpeed+=5;
      //speed++
     speed=0
    }
    console.log(alienSpeed)
    aliens=new Alien(Math.round(random(50,width-50)),camera.position.y-width/2-200)
    aliens.sprite.velocityY=alienSpeed
    alienGroup.add(aliens.sprite)
    aliens.display();
    //console.log("aliens")
  }
}
function spawn2Aliens(){
  if(frameCount%180===0){
    if(speed===1){
      console.log("speed increase")
      alienSpeed+=5;
     // speed++
      speed=0
    }
    console.log(alienSpeed)
    aliens2=new Alien2(Math.round(random(50,width-50)),camera.position.y-width/2-200,alienSpeed)
    aliens2.sprite.velocityY=alienSpeed
    alien2Group.add(aliens2.sprite)
    aliens2.display();
    //console.log("aliens")
  }
}
function spawnlifePowerups(){
  if(frameCount%280===0){
    lifePowerups=new LifePowerup(Math.round(random(50,width-50)),camera.position.y-width/2-200)
    lifePowerupGroup.add(lifePowerups.sprite)
    lifePowerups.display();
  //  console.log("aliens")
  }
}
function spawnscorePowerups(){
  if(frameCount%180===0){
    scorePowerups=new scorePowerup(Math.round(random(50,width-50)),camera.position.y-width/2-200)
    scorePowerupGroup.add(scorePowerups.sprite)
    scorePowerups.display();
  //  console.log("aliens")
  }
}
function spawnspeedPowerups(){
  if(frameCount%280===0){
    speedPowerups=new speedPower(Math.round(random(50,width-50)),camera.position.y-width/2-200)
    speedPowerupsGroup.add(speedPowerups.sprite)
    speedPowerups.display();
  //  console.log("aliens")
  }
}
function spawnBombs(){
  if(frameCount%360===0){
    bombs =new Bomb(Math.round(random(50,width-50)),camera.position.y-width/2-200)
   bombs.sprite.changeAnimation("bomb",bombs.image)
  //  bombs.sprite.addAnimation("b",explosion)
    bombGroup.add(bombs.sprite)
    bombs.display();
  //  console.log("aliens")
  }
}
function spawnShipPowerups(){
  if(frameCount%300===0){
    shipPowerups=new shipPowerup(Math.round(random(50,width-50)),camera.position.y-width/2-200)
    shipPowerupGroup.add(shipPowerups.sprite)
    shipPowerups.display();
  //  console.log("aliens")
  }
}
function fireBullets(){
  if(keyWentDown("space")){
    var bullet=new Bullets(spaceship.sprite.x,spaceship.sprite.y,10,10)
    bullet.sprite.depth=spaceship.sprite.depth
    spaceship.sprite.depth+=1
    bulletGroup.add(bullet.sprite)
   bullet.display();
  }
}