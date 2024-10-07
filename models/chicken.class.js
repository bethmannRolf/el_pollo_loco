class Chicken extends MovableObject {

    y = 360;
    height = 70;
    width = 80;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'

    ];


    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];





    chicken_cackling = new Audio('audio/cackle1.mp3')

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD); 
        this.x = 1500 + Math.random() * 1100;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();

    }


    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);  // Spiele Animation für totes Huhn
            }
        }, 100);
    }





/*
    animate() {
        setInterval(() => {

            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            //  this.chicken_cackling.play();  
            this.playAnimation(this.IMAGES_WALKING)
        }, 100)
    }
*/

}