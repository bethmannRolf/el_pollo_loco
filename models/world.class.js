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
    throwing_sound = new Audio('audio/throwing.mp3')



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw()
        this.setWorld();
        this.run()
    };



    setWorld() {
        this.character.world = this;


    }

    run() {

        setInterval(() => {

            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            this.throwing_sound.play();
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
            this.throwableObjects.push(bottle)
        }

    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
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
                console.log('Coinindex', index)
                this.level.collectableCoinObjects.splice(index, 1);
            }
        });
    }

    checkBottleCollisions() {
        this.level.collectableBottleObjects.forEach((collectableBottle, index) => {
            if (this.character.isColliding(collectableBottle)) {
                this.character.collectBottle();
                this.bottleBar.setPercentage(this.character.bottles)
                console.log('Bottleindex', index)
                this.level.collectableBottleObjects.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects
        this.addToMap(this.bottleBar);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);

        this.addObjectsToMap(this.level.enemies);
        
        this.addObjectsToMap(this.throwableObjects)
        this.addObjectsToMap(this.level.collectableCoinObjects);
        this.addObjectsToMap(this.level.collectableBottleObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
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
        mo.drawFrame(this.ctx);
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