class SmallChicken extends MovableObject{



    y = 395;
    height = 35;
    width = 40;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'

    ];
   
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING)
        this.x = 400 + Math.random() * 1100;
        this.animate()
        this.speed = 0.15 + Math.random() * 0.25
    
    }

    animate() {

        setInterval(() => {    
           this.moveLeft();  
        }, 1000 / 60);
       
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING)
        }, 100)
    }







}