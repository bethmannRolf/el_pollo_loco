class Endboss extends MovableObject{


    y = 360;
    height = 70;
    width = 80;
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'

    ]



    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING)
        this.x = 2000 + Math.random() * 500;
        this.animate()
        this.speed = 0.15 + Math.random() * 0.25
    
    }


}