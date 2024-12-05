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

        /**
     * Creates an instance of the Chicken class.
     * Initializes the chicken's position, speed, images, and starts the animation and sound.
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 1000 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

       /**
     * Starts the animation for the chicken, including movement and cackling sound.
     * @function
     */
    animate() {
        this.moveLeftPeriodically();
        this.updateAnimation();
        this.handleCacklingSound();
    }

        /**
     * Moves the chicken left at a regular interval.
     * The chicken stops moving if it is dead.
     * @function
     */
    moveLeftPeriodically() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }

        /**
     * Updates the animation of the chicken based on its state (walking or dead).
     * @function
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
     * Handles the cackling sound of the chicken, playing or pausing it depending on the chicken's state.
     * The sound is paused if the chicken is dead, the game is not active, or the sound is muted.
     * @function
     */
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