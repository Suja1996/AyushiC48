class spaceShip{
    constructor(x,y,width,height){
      
        this.sprite= createSprite(x,y,width,height)
        this.sprite.velocityY=-5;
        this.image=loadImage("images/spaceShip1.png")
    }
    display(input,scaleship){
        
       
        this.sprite.addImage(input)
        this.sprite.scale=scaleship
  
    }
}