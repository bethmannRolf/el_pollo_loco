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
    endbossStatusEntryPoint = 3300;
    throwing_sound = new Audio('audio/throwing.mp3');
    splash_sound = new Audio('audio/glass_breaking1.mp3');

    /**
 * Constructs an instance of the game world.
 * 
 * Initializes the game world by setting up the canvas context, storing a reference to the 
 * canvas and keyboard, and starting the drawing, world setup, and game loop processes.
 * 
 * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
 * @param {Object} keyboard - The keyboard state object containing key press information.
 */
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
     * Starts the game loop by setting up intervals for collision checks and object interactions.
     * 
     * - Runs `checkCollisionFromAbove` every 50 milliseconds to detect upward collisions.
     * - Runs multiple collision and interaction checks every 200 milliseconds, including:
     *   - General collisions (`checkCollisions`)
     *   - Object interactions like throwing objects (`checkThrowObjects`)
     *   - Collectable interactions (`checkCoinCollisions`, `checkBottleCollisions`)
     *   - Enemy interactions and game state checks (`checkBottleEnemyCollisions`, `checkFirstContactWithEndboss`).
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
            this.checkFirstContactWithEndboss();
        }, 200);
    }

    /**
     * Checks if any throwable bottles collide with enemies. Handles the collision
     * logic such as playing splash animations, updating energy levels, and removing
     * dead enemies or used bottles.
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
     */
    playSplashSoundIfNeeded() {
        if (isMuted === false) {
            this.splash_sound.play();
        }
    }

    /**
 * Updates the status bar of the endboss based on its current energy level.
 * @param {MovableObject} enemy - The enemy whose status is being updated.
 */
    updateEndbossStatus(enemy) {
        this.statusBarEndboss.setPercentage(enemy.energy);
    }

    /**
 * Removes an enemy from the world if it is dead. Adds a delay for animation purposes.
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
 */
    checkCollisionFromAbove() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isCollidingFromAbove(enemy) && !this.character.jumpCooldown && !enemy.isDead() && this.character.speedY <= 0) {
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
 */
    checkCoinCollisions() {
        this.level.collectableCoinObjects.forEach((collectableCoin, index) => {
            if (this.character.isCollidingWithCollectable(collectableCoin)) {
                this.character.collectCoin()
                this.coinBar.setPercentage(this.character.coins)
                this.level.collectableCoinObjects.splice(index, 1);
            }
        });
    }

    /**
 * Checks if the character collects a bottle and updates the bottle bar and inventory.
 */
    checkBottleCollisions() {
        this.level.collectableBottleObjects.forEach((collectableBottle, index) => {
            if (this.character.isCollidingWithCollectable(collectableBottle)) {
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
 */
    addBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

/**
 * Adds static objects to the game map, such as bottles, status bars, and coins.
 * 
 * Adds the `bottleBar`, `statusBar`, and `coinBar` to the map. If the player has made
 * the first contact with the end boss (`firstEndbossContact` is `true`), the `statusBarEndboss`
 * is also added to the map.
 */
    addStaticObjects() {
        this.addToMap(this.bottleBar);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);

        if (firstEndbossContact === true) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * Checks if the character has made the first contact with the end boss.
     * 
     * Sets the `firstEndbossContact` flag to `true` if the character's horizontal position
     * reaches or exceeds the `endbossStatusEntryPoint` on the game map.
     */
    checkFirstContactWithEndboss() {
        if (this.character.x >= this.endbossStatusEntryPoint) {
            firstEndbossContact = true;
        }
    }

    /**
 * Adds dynamic objects to the canvas, including the character, enemies, throwable objects,
 * collectible coins, and bottles. These objects move or change during gameplay.
 * 
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
     * @param {DrawableObject} mo - The drawable object whose image transformation is being restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}