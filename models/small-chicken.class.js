class SmallChicken extends MovableObject {

    y = 395;
    height = 35;
    width = 40;
    energy = 15;
    chirping_sound = new Audio('audio/chick_chirping.mp3')
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]

    /**
  * Initializes a new SmallChicken instance.
  * Loads images for animations and sets initial position and speed.
  */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 1100;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Starts all animations and behaviors for the small chicken.
     */
    animate() {
        this.moveLeftPeriodically();
        this.updateAnimation();
        this.handleChirpingSound();
    }

    /**
     * Moves the small chicken to the left periodically if it is not dead.
     */
    moveLeftPeriodically() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

    /**
 * Updates the animation of the small chicken based on its state.
 * Plays walking animation if alive, or dead animation otherwise.
 */
    updateAnimation() {
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 100);
    }

    /**
 * Handles the chirping sound of the small chicken.
 * Pauses sound if the chicken is dead, the game is muted, or the game is not active.
 */
    handleChirpingSound() {
        setInterval(() => {
            if (this.isDead() || isMuted == true || inGame == false) {
                this.chirping_sound.pause();
            } else {
                this.chirping_sound.play();
            }
        }, 100);
    }
}