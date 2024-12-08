class CollectableCoinObject extends MovableObject {

    width = 80;
    height = 80;
    IMAGES_COIN_ALTERNATING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'

    ];
    
    /**
     * Creates an instance of a collectable coin object.
     * The coin is initialized with a random position and alternating images for animation.
     * 
     * @constructor
     */
    constructor() {
        super().loadImage(this.IMAGES_COIN_ALTERNATING[0]);
        this.loadImages(this.IMAGES_COIN_ALTERNATING);
        this.x = 200 + 1600  * Math.random();
        this.y = 80 + 80 * Math.random();
        this.animate()
    }

       /**
     * Starts an interval that alternates the coin's image to create an animation effect.
     * The coin image alternates every 200ms.
     * 
     * @method animate
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN_ALTERNATING);
        }, 200)
    }
}