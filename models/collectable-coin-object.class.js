class CollectableCoinObject extends MovableObject {
    width = 80;
    height = 80;

    IMAGES_COIN_ALTERNATING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'

    ]


    constructor() {
        super().loadImage(this.IMAGES_COIN_ALTERNATING[0]);
        this.loadImages(this.IMAGES_COIN_ALTERNATING)
        this.x = 100;
        this.y = 100;

        this.animate()
    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN_ALTERNATING)
        }, 200)
    }

}