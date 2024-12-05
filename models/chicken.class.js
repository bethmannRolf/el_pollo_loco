class Chicken extends MovableObject {

    y = 360;
    height = 70;
    width = 80;
    energy = 10;
    chicken_cackling = new Audio('audio/cackle2.mp3');
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1000 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    animate() {
        this.moveLeftPeriodically();
        this.updateAnimation();
        this.handleCacklingSound();
    }

    moveLeftPeriodically() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    updateAnimation() {
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 100);
    }

    handleCacklingSound() {
        setInterval(() => {
            if (this.isDead() || isMuted == true || inGame == false) {
                this.chicken_cackling.pause();
            } else {
                this.chicken_cackling.play();
            }
        }, 100);
    }
}