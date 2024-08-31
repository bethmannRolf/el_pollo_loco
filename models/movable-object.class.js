class MovableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = [];
    currentImage = 0;
    speed = 0.15

    //loadImage(''img/test.png')
    loadImage(path) {
        this.img = new Image()
        this.img.src = path;

    }

    loadImages(arr) {
 
        arr.forEach(path =>{

            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving Right')
    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;
        }, 1000/60
        )

    }


}