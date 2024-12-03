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

    throw() {
        this.speedY = 10;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATING);
            this.x += 10;
            this.world.level.enemies.forEach((enemy) => {
                if (this.isColliding(enemy)) {
                    enemy.hitByJump();
                    this.speedY = 0;
                    clearInterval(throwInterval);
                    setInterval(() => {
                        this.playAnimation(this.IMAGES_SPLASH);
                    }, 100);
                    setTimeout(() => {
                        this.world.throwableObjects = this.world.throwableObjects.filter(obj => obj !== this);
                    }, 500);
                }
            });
        }, 25);
    }

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