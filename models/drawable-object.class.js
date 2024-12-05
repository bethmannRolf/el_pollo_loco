class DrawableObject {

    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;



        /**
     * Loads an image from a given path and assigns it to the `img` property.
     * 
     * @param {string} path - The file path of the image to be loaded.
     * @method loadImage
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

       /**
     * Draws the object on the canvas at its current position using the given context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context used to draw the image.
     * @method draw
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

        /**
     * Loads multiple images from an array of file paths and stores them in the `imageCache`.
     * The images can be used later for animations or other purposes.
     * 
     * @param {string[]} arr - An array of image file paths.
     * @method loadImages
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }
}