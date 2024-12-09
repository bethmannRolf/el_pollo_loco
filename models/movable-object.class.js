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
    verticalCollectableTolerance = 60;
    /**
 * Applies gravity to the object, updating its vertical position and speed.
 */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }
        else {
            return this.y < 180;
        }
    }

    /**
     * Increases the coin count and plays a sound effect if not muted.
     */
    collectCoin() {
        if (isMuted == false) {
            this.collectCoinSound.play();
        }
        this.coins += 20;
    }

    /**
 * Increases the bottle count and plays a sound effect if not muted.
 */
    collectBottle() {
        if (isMuted == false) {
            this.collectBottleSound.play();
        }
        this.bottles += 20;
    }

    /**
 * Reduces the object's energy by 5 and records the timestamp of the hit.
 */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
 * Checks if the object is currently hurt (within 1 second of the last hit).
 * @returns {boolean} True if the object is hurt, false otherwise.
 */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Reduces the object's energy by 40 due to being hit by a bottle.
     */
    hitByBottle() {
        this.energy = this.energy - 40;
    }

    /**
     * Checks if the object is dead (energy is 0 or less).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy <= 0;
    }

    /**
  * Plays an animation by cycling through the provided image array.
  * @param {string[]} images Array of image paths for the animation.
  */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
 * Moves the object to the right by increasing its X coordinate.
 */
    moveRight() {
        this.x += this.speed;
    }

    /**
 * Moves the object to the left by decreasing its X coordinate.
 */
    moveLeft() {
        this.x -= this.speed;
    }

    jumpCooldown = false;

    /**
     * Makes the object jump by setting its vertical speed and applying a cooldown.
     */
    jump() {
        if (!this.jumpCooldown) {
            this.speedY = 20;
            this.jumpCooldown = true;
            setTimeout(() => {
                this.jumpCooldown = false;
            }, 50);
        }
    }

    /**
  * Instantly sets the object's energy to 0 after being hit by a jump.
  */
    hitByJump() {
        this.energy = 0;
    }

    /**
 * Checks for a collision with another movable object.
 * @param {MovableObject} mo Another movable object to check against.
 * @returns {boolean} True if a collision occurs, false otherwise.
 */
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    isCollidingWithCollectable(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height -this.verticalCollectableTolerance;
    }
    
    /**
     * Checks for a collision from above with another movable object.
     * @param {MovableObject} mo Another movable object to check against.
     * @returns {boolean} True if a collision from above occurs, false otherwise.
     */
    isCollidingFromAbove(mo) {
        let tolerance = 20;
        return (
            this.y + this.height <= mo.y + tolerance &&
            this.y + this.height > mo.y &&
            this.x + this.width > mo.x - tolerance &&
            this.x < mo.x + mo.width + tolerance
        );
    }
}