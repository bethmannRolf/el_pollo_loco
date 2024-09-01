class MovableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    //loadImage(''img/test.png')
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;

    }

    loadImages(arr) {
 
        arr.forEach(path =>{

            let img = new Image();
            img.src = path;
            img.style ='transform: scaleX(-1)'
            this.imageCache[path] = img;
        });
    }

    playAnimation(images){
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }




    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60
        )

    }


}