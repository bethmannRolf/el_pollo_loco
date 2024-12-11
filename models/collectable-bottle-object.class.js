class CollectableBottleObject extends MovableObject {

    width = 80;
    height = 80;
    IMAGES_BOTTLE_ALTERNATING = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

        /**
     * Creates an instance of a collectable bottle object.
     * The bottle is initialized with a random position and alternating images for animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_BOTTLE_ALTERNATING[0]);
        this.loadImages(this.IMAGES_BOTTLE_ALTERNATING);
        this.x = 200 + 1600 * Math.random();
        this.y = 80 + 80 * Math.random();
        this.animate()
    }

        /**
     * Starts an interval that alternates the bottle's image to create an animation effect.
     * The bottle image alternates every 350ms.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ALTERNATING)
        }, 350)
    }
}