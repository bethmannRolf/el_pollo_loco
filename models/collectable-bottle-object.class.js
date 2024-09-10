class CollectableBottleObject extends MovableObject{


IMAGES_BOTTLE_ALTERNATING = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
]



    constructor(){

        super().loadImage(this.IMAGES_BOTTLE_ALTERNATING[0]);
        this.loadImages(this.IMAGES_BOTTLE_ALTERNATING)
        this.x = 300;
        this.y = 300;
        this.width = 80
        this.height = 80
      
        this.animate()

    }

    animate() {

        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ALTERNATING)
        }, 350)
    }


}