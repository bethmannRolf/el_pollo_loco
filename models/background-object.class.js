class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
 * Creates an instance of a class that inherits from another class and loads an image.
 * Initializes the object's position with the specified x-coordinate and calculates the y-coordinate.
 *
 * @param {string} imagePath - The path to the image that should be loaded for the object.
 * @param {number} x - The x-coordinate of the object's initial position.
 */
    constructor(imagePath, x) {
        super().loadImage(imagePath)
        this.x = x;
        this.y = 480 - this.height;
    }
}