class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    throwing_sound = new Audio('audio/throwing.mp3');
    splash_sound = new Audio('audio/glass_breaking1.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };

    /**
 * Binds the character and endboss objects to the world instance.
 * Ensures that these objects can interact with the world environment.
 * @function
 * @memberof World
 */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    /**
 * Starts the main game logic by running collision checks and object interactions
 * at regular intervals. Uses two separate intervals for efficient execution.
 * @function
 * @memberof World
 */
    run() {
        setInterval(() => {
            this.checkCollisionFromAbove();
        }, 50);
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
            this.checkBottleEnemyCollisions();
        }, 200);
    }


    /**
     * Checks if any throwable bottles collide with enemies. Handles the collision
     * logic such as playing splash animations, updating energy levels, and removing
     * dead enemies or used bottles.
     * @function
     * @memberof World
     */
    checkBottleEnemyCollisions() {
        this.splash_sound.pause();
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (this.isBottleCollidingWithEnemy(bottle, enemy)) {
                    this.handleBottleCollision(bottle, bottleIndex, enemy, enemyIndex);
                }
            });
        });
    }

    /**
 * Determines whether a throwable bottle is colliding with an enemy.
 * @function
 * @memberof World
 * @param {ThrowableObject} bottle - The throwable bottle object.
 * @param {MovableObject} enemy - The enemy to check for collisions.
 * @returns {boolean} - True if the bottle is colliding with the enemy, false otherwise.
 */
    isBottleCollidingWithEnemy(bottle, enemy) {
        return bottle.isColliding(enemy);
    }

    /**
 * Handles the logic for a collision between a throwable bottle and an enemy.
 * Updates animations, plays sound effects, adjusts energy, and removes objects as needed.
 * @function
 * @memberof World
 * @param {ThrowableObject} bottle - The bottle involved in the collision.
 * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
 * @param {MovableObject} enemy - The enemy involved in the collision.
 * @param {number} enemyIndex - The index of the enemy in the enemies array.
 */
    handleBottleCollision(bottle, bottleIndex, enemy, enemyIndex) {
        bottle.splash();
        enemy.hitByBottle();
        this.playSplashSoundIfNeeded();
        this.updateEndbossStatus(enemy);
        this.removeEnemyIfDead(enemy, enemyIndex);
        this.removeBottleFromWorld(bottleIndex);
    }



    /**
     * Plays the splash sound effect if sound is not muted.
     * @function
     * @memberof World
     */
    playSplashSoundIfNeeded() {
        if (isMuted === false) {
            this.splash_sound.play();
        }
    }

    /**
 * Updates the status bar of the endboss based on its current energy level.
 * @function
 * @memberof World
 * @param {MovableObject} enemy - The enemy whose status is being updated.
 */
    updateEndbossStatus(enemy) {
        this.statusBarEndboss.setPercentage(enemy.energy);
    }

    /**
 * Removes an enemy from the world if it is dead. Adds a delay for animation purposes.
 * 
 * @function
 * @memberof World
 * @param {MovableObject} enemy - The enemy to be removed.
 * @param {number} enemyIndex - The index of the enemy in the enemies array.
 */
    removeEnemyIfDead(enemy, enemyIndex) {
        if (enemy.isDead()) {
            setTimeout(() => {
                this.level.enemies.splice(enemyIndex, 1);
            }, 500);
        }
    }

    /**
 * Removes a throwable bottle from the world after a short delay.
 * 
 * @function
 * @memberof World
 * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
 */
    removeBottleFromWorld(bottleIndex) {
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 100);
    }

    /**
 * Checks if the character collides with an enemy from above. If so, the enemy
 * is hit, and the character jumps off.
 * 
 * @function
 * @memberof World
 */
    checkCollisionFromAbove() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isCollidingFromAbove(enemy) && !this.character.jumpCooldown && !enemy.isDead()) {
                this.character.jump();
                enemy.hitByJump();
                if (enemy.isDead()) {
                    setTimeout(() => {
                        this.level.enemies.splice(index, 1);
                    }, 500);
                }
            }
        });
    }


    /**
     * Checks if the player has pressed the "D" key to throw a bottle.
     * Creates a throwable bottle object and deducts one bottle from the character's inventory.
     * 
     * @function
     * @memberof World
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            if (isMuted == false) {
                this.throwing_sound.play();
            }
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
            this.throwableObjects.push(bottle);
            this.character.bottles -= 20;
            this.bottleBar.setPercentage(this.character.bottles);
        }
    }

    /**
 * Continuously checks for collisions between the character and enemies.
 * If a collision is detected, the character takes damage.
 * 
 * @function
 * @memberof World
 */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isCollidingFromAbove(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }

    /**
 * Checks if the character collects a coin and updates the coin bar and inventory.
 * @function
 * @memberof World
 */
    checkCoinCollisions() {
        this.level.collectableCoinObjects.forEach((collectableCoin, index) => {
            if (this.character.isColliding(collectableCoin)) {
                this.character.collectCoin()
                this.coinBar.setPercentage(this.character.coins)
                this.level.collectableCoinObjects.splice(index, 1);
            }
        });
    }

    /**
 * Checks if the character collects a bottle and updates the bottle bar and inventory.
 * @function
 * @memberof World
 */
    checkBottleCollisions() {
        this.level.collectableBottleObjects.forEach((collectableBottle, index) => {
            if (this.character.isColliding(collectableBottle)) {
                this.character.collectBottle();
                this.bottleBar.setPercentage(this.character.bottles)
                this.level.collectableBottleObjects.splice(index, 1);
            }
        });
    }

    /**
 * Draws the entire game world onto the canvas.
 * This includes background objects, enemies, coins, bottles, and the character.
 * 
 * @function
 * @memberof World
 */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addBackground();
        this.ctx.translate(-this.camera_x, 0);
        this.addStaticObjects();
        this.ctx.translate(this.camera_x, 0);
        this.addDynamicObjects();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    /**
 * Adds background objects and clouds to the canvas.
 * This method is responsible for rendering the static background of the game.
 * 
 * @function
 * @memberof World
 */
    addBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
 * Adds static UI elements, such as status bars, to the canvas.
 * These elements do not change position during gameplay.
 * 
 * @function
 * @memberof World
 */
    addStaticObjects() {
        this.addToMap(this.bottleBar);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.statusBarEndboss);
    }

    /**
 * Adds dynamic objects to the canvas, including the character, enemies, throwable objects,
 * collectible coins, and bottles. These objects move or change during gameplay.
 * 
 * @function
 * @memberof World
 */
    addDynamicObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.level.collectableCoinObjects);
        this.addObjectsToMap(this.level.collectableBottleObjects);
    }

    /**
 * Iterates over an array of objects and adds each one to the canvas map.
 * 
 * @function
 * @memberof World
 * @param {Array<DrawableObject>} objects - An array of drawable objects to add to the canvas.
 */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    /**
 * Adds a single drawable object to the canvas.
 * If the object is facing the other direction, its image is flipped horizontally.
 * 
 * @function
 * @memberof World
 * @param {DrawableObject} mo - The drawable object to add to the canvas.
 */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
 * Flips an image horizontally by modifying the canvas transformation matrix.
 * Used for objects facing the opposite direction.
 * 
 * @function
 * @memberof World
 * @param {DrawableObject} mo - The drawable object whose image needs to be flipped.
 */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas transformation matrix after an image has been flipped.
     * Ensures the subsequent drawings are not affected by the transformation.
     * 
     * @function
     * @memberof World
     * @param {DrawableObject} mo - The drawable object whose image transformation is being restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}