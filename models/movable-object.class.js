class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    coins = 0;
    bottles = 0;
    lastHit = 0;
   


    collectCoinSound = new Audio('audio/coin1.mp3');
    collectBottleSound = new Audio('audio/collect_bottle.mp3');

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;

        }
        else {
            return this.y < 180;
        }
    }






    collectCoin() {
        this.collectCoinSound.play();
        this.coins += 20;  
    }




    collectBottle() {
        this.collectBottleSound.play();
        this.bottles += 20;
       
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }



    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    hitByBottle(){
   
        this.energy = this.energy -40
    }


    isDead() {
      return  this.energy <= 0;
    }




    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;

    }

    moveLeft() {
        this.x -= this.speed
    }



jumpCooldown = false;


jump() {
    if (!this.jumpCooldown) {
        this.speedY = 20;
        this.jumpCooldown = true;
        setTimeout(() => {
            this.jumpCooldown = false;
        }, 50); 
    }
}

hitByJump(){

    this.energy = 0;
}




    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }







    isCollidingFromAbove(mo) {
        const tolerance = 20; 
        return (
            this.y + this.height <= mo.y + tolerance &&
            this.y + this.height > mo.y &&        
            this.x + this.width > mo.x - tolerance && 
            this.x < mo.x + mo.width + tolerance   
        );
    }
    







/*
    isCollidingFromAbove(mo) {
        // console.log('Überprüfe Kollision von oben mit', mo);
        return this.y + this.height <= mo.y + 20 && 
               this.y + this.height > mo.y &&
               this.x + this.width > mo.x &&
               this.x < mo.x + mo.width;
    }
    
*/




/*
    isCollidingFromAbove(mo) {
        return this.y + this.height <= mo.y +10  && // Der Charakter ist über dem Objekt (mit Toleranz)
               this.y + this.height > mo.y &&      // Der Charakter trifft von oben
               this.x + this.width > mo.x &&       // Horizontaler Überlapp
               this.x < mo.x + mo.width;           // Horizontaler Überlapp
    }
    
*/
/*
    checkCollisionFromAbove(mo) {
        if (this.isCollidingFromAbove(mo)) {
            this.jump();  // Charakter springt, wenn er von oben kollidiert
            return false;  // Verhindert die Kollision
        }
        return this.isColliding(mo);  // Ansonsten normale Kollision
    }
*/

}