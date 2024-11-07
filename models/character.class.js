class Character extends MovableObject {

    height = 250;
    y = 180;
    speed = 5;
    lastPressTime = null;
    snoring = false;
   

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'

    ];



    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];



    world;

   

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.getPressTime();
        this.animate();
    }

    getTimeSinceLastPress() {
        if (this.lastPressTime === null) {
            return null;
        }
        let currentTime = new Date().getTime();
        return currentTime - this.lastPressTime;

    }

    getPressTime() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.D) {
                this.lastPressTime = new Date().getTime();
            }
          
        }, 50);
    }


    walking_sound = new Audio('audio/walking_1.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    snore_sound = new Audio('audio/snoring1.mp3');



/*

    animate() {
        setInterval(() => {
            this.walking_sound.pause();

            // if (background_music.paused) {
            //     background_music.play().catch(error => console.log(error)); // Fehler abfangen
            // } else {
            //     background_music.pause();
            // }
            
          
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround() && isMuted == false ) {
                    this.walking_sound.play();
                }
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround() && isMuted == false) {
                    this.walking_sound.play();
                }
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                if (isMuted == false) {
                  this.jump_sound.play();  
                }
                
            }
            this.world.camera_x = -this.x + 100;

        }, 1000 / 60);

        setInterval(() => {
            this.snoring = false;
            this.snore()

           let timeSinceLastPress = this.getTimeSinceLastPress();
           
   
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
                setTimeout(() => {
                    win = false;
                    stopGame(); 
                }, 1200); 

            }

            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
                
            }

            else if (timeSinceLastPress >= 2000 && timeSinceLastPress <= 6999 && !this.isAboveGround() ) {
                
                this.playAnimation(this.IMAGES_IDLE)
            }
            else if (timeSinceLastPress >= 7000 && !this.isAboveGround() && inGame == true) {
                this.playAnimation(this.IMAGES_IDLE_LONG);
                this.snoring = true;
                this.snore()
              
            }
           
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
            else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }
        }, 50)
    }


*/
//optimierte animate version, mussich noch aufteilen
animate() {
    setInterval(() => {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (!this.isAboveGround() && isMuted == false && this.walking_sound.paused) {
                this.walking_sound.play().catch(error => console.log(error));
            }
        } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (!this.isAboveGround() && isMuted == false && this.walking_sound.paused) {
                this.walking_sound.play().catch(error => console.log(error));
            }
        } else {
            // Nur pausieren, wenn keine Bewegungstaste gedrückt ist
            if (!this.walking_sound.paused) {
                this.walking_sound.pause();
            }
        }

        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            if (isMuted == false) {
                this.jump_sound.play().catch(error => console.log(error));
            }
        }

        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    // Zweites Intervall für Animationen
    setInterval(() => {
        this.snoring = false;
        this.snore();
        let timeSinceLastPress = this.getTimeSinceLastPress();

        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                win = false;
                stopGame(); 
            }, 1200); 
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (timeSinceLastPress >= 2000 && timeSinceLastPress <= 6999 && !this.isAboveGround()) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (timeSinceLastPress >= 7000 && !this.isAboveGround() && inGame == true) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            this.snoring = true;
            this.snore();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }, 50);
}








snore(){
    if (this.snoring == true && isMuted == false) {
        this.snore_sound.play();
    }
else{
    this.snore_sound.pause();
}

}


}