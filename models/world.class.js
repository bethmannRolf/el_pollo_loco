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

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

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

    isBottleCollidingWithEnemy(bottle, enemy) {
        return bottle.isColliding(enemy);
    }

    handleBottleCollision(bottle, bottleIndex, enemy, enemyIndex) {
        bottle.splash();
        enemy.hitByBottle();
        this.playSplashSoundIfNeeded();
        this.updateEndbossStatus(enemy);
        this.removeEnemyIfDead(enemy, enemyIndex);
        this.removeBottleFromWorld(bottleIndex);
    }

    playSplashSoundIfNeeded() {
        if (isMuted === false) {
            this.splash_sound.play();
        }
    }

    updateEndbossStatus(enemy) {
        this.statusBarEndboss.setPercentage(enemy.energy);
    }

    removeEnemyIfDead(enemy, enemyIndex) {
        if (enemy.isDead()) {
            setTimeout(() => {
                this.level.enemies.splice(enemyIndex, 1);
            }, 500);
        }
    }

    removeBottleFromWorld(bottleIndex) {
        setTimeout(() => {
            this.throwableObjects.splice(bottleIndex, 1);
        }, 100);
    }

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

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isCollidingFromAbove(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }

    checkCoinCollisions() {
        this.level.collectableCoinObjects.forEach((collectableCoin, index) => {
            if (this.character.isColliding(collectableCoin)) {
                this.character.collectCoin()
                this.coinBar.setPercentage(this.character.coins)
                this.level.collectableCoinObjects.splice(index, 1);
            }
        });
    }

    checkBottleCollisions() {
        this.level.collectableBottleObjects.forEach((collectableBottle, index) => {
            if (this.character.isColliding(collectableBottle)) {
                this.character.collectBottle();
                this.bottleBar.setPercentage(this.character.bottles)
                this.level.collectableBottleObjects.splice(index, 1);
            }
        });
    }

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

    addBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    addStaticObjects() {
        this.addToMap(this.bottleBar);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.statusBarEndboss);
    }

    addDynamicObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.level.collectableCoinObjects);
        this.addObjectsToMap(this.level.collectableBottleObjects);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}