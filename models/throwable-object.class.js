class ThrowableObject extends MovableObject {

    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    /**
 * Creates a new throwable object.
 * @param {number} x - The initial x-coordinate of the object.
 * @param {number} y - The initial y-coordinate of the object.
 * @param {Object} world - The game world object for collision and state management.
 */
    constructor(x, y, world) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.world = world;
        this.throw();
    }

    /**
     * Initiates the throw action by setting initial speed, applying gravity, and starting intervals.
     */
    throw() {
        this.setInitialThrowSpeed();
        this.applyGravity();
        this.startThrowInterval();
    }

    /**
 * Sets the initial vertical speed for the throw.
 */
    setInitialThrowSpeed() {
        this.speedY = 10;
    }

    /**
 * Starts the interval to handle the bottle's animation, movement, and collision detection.
 */
    startThrowInterval() {
        let throwInterval = setInterval(() => {
            this.playThrowAnimation();
            this.moveBottle();
            this.checkCollisions(throwInterval);
        }, 25);
    }

    /**
 * Plays the bottle's rotation animation.
 */
    playThrowAnimation() {
        this.playAnimation(this.IMAGES_ROTATING);
    }

    /**
  * Moves the bottle horizontally to simulate the throw.
  */
    moveBottle() {
        this.x += 10;
    }

    /**
 * Checks for collisions between the throwable object and enemies in the game.
 * @param {number} throwInterval - The interval ID for the throwing process.
 */
    checkCollisions(throwInterval) {
        this.world.level.enemies.forEach((enemy) => {
            if (this.isColliding(enemy)) {
                this.handleCollision(enemy, throwInterval);
            }
        });
    }

    /**
     * Handles a collision between the throwable object and an enemy.
     * Stops the throw, shows a splash animation, and removes the object from the game.
     * @param {Object} enemy - The enemy object that the throwable object collided with.
     * @param {number} throwInterval - The interval ID for the throwing process.
     */
    handleCollision(enemy, throwInterval) {
        enemy.hitByJump();
        this.speedY = 0;
        clearInterval(throwInterval);
        this.showSplashAnimation();
        this.removeBottleFromWorld();
    }

    /**
 * Plays the splash animation after a collision.
 */
    showSplashAnimation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 100);
    }

    /**
 * Removes the throwable object from the game world after a short delay.
 */
    removeBottleFromWorld() {
        setTimeout(() => {
            this.world.throwableObjects = this.world.throwableObjects.filter(obj => obj !== this);
        }, 500);
    }

    /**
     * Plays the splash animation manually, stopping movement and handling the frames.
     */
    splash() {
        this.speedY = 0;
        this.currentImage = 0;
        let splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
            if (this.currentImage >= this.IMAGES_SPLASH.length) {
                clearInterval(splashInterval);
            }
        }, 200);
    }
}