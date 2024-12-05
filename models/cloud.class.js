class Cloud extends MovableObject {

    y = 30;
    width = 500;
    height = 250;

       /**
     * Creates an instance of the Cloud class.
     * Initializes the cloud's position, speed, and starts the animation.
     * @constructor
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 2500;
        this.animate();
        this.speed = 0.15 + Math.random() * 0.25;
    }

        /**
     * Starts the animation for the cloud, causing it to move left at a regular interval.
     * @function
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}