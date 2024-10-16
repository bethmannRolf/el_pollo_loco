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
        if (isMuted == false) {
            this.collectCoinSound.play();
        }
        this.coins += 20;
    }

    collectBottle() {
        if (isMuted == false) {
            this.collectBottleSound.play();
        }
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

    hitByBottle() {
        this.energy = this.energy - 40
    }

    isDead() {
        return this.energy <= 0;
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

    hitByJump() {
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
}