class StatusBarEndboss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    percentage = 100;

    /**
 * Constructor for initializing the status bar of the endboss.
 * Loads images, sets the position, size, and initializes the percentage to 100.
 * 
 * @constructor
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 250;
        this.y = -5;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the endboss's health and updates the corresponding image for the status bar.
     * 
     * @param {number} percentage - The health percentage of the endboss (0-100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image based on the current percentage.
     * This method is used to determine which image corresponds to the current health.
     * 
     * @returns {number} The index of the image corresponding to the current health.
     */
    resolveImageIndex() {
        return this.calculateIndexBasedOnPercentage(this.percentage);
    }

    /**
     * Calculates the index of the image based on the given percentage.
     * 
     * @param {number} percentage - The health percentage of the endboss (0-100).
     * @returns {number} The index of the image to display.
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