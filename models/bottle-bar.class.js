class BottleBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]

    percentage = 100;

    /**
 * Creates an instance of the class and initializes properties like position, size, and image loading.
 * Inherits from a parent class and loads a set of images for the object.
 *
 * @constructor
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 30;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
 * Sets the percentage value and updates the object's image based on the new percentage.
 * 
 * - Updates the `percentage` property.
 * - Resolves the appropriate image index based on the current percentage and updates the image.
 *
 * @param {number} percentage - The percentage value (between 0 and 5) that determines the object's state and image.
 */
    setPercentage(percentage) {
        this.percentage = percentage; // => 0.....5;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
 * Resolves the image index based on the current percentage value.
 * 
 * - Calls the `calculateIndexBasedOnPercentage` method to determine the correct image index.
 *
 * @returns {number} The index of the image to be used, calculated based on the current percentage.
 */
    resolveImageIndex() {
        return this.calculateIndexBasedOnPercentage(this.percentage);
    }

    /**
 * Calculates the image index based on the given percentage.
 * 
 * - Maps the percentage value to an image index between 0 and 5.
 * - The higher the percentage, the higher the index returned.
 *
 * @param {number} percentage - The percentage value (0 to 100) used to calculate the image index.
 * @returns {number} The corresponding image index based on the percentage.
 */
    calculateIndexBasedOnPercentage(percentage) {
        if (percentage >= 100) {
            return 5;
        } else if (percentage >= 80) {
            return 4;
        } else if (percentage >= 60) {
            return 3;
        } else if (percentage >= 40) {
            return 2;
        } else if (percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}