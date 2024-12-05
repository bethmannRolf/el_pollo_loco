class CoinBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]

    percentage = 100;

    /**
 * Creates an instance of the CoinBar class.
 * Initializes the position, size, and sets the initial percentage.
 * @constructor
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 70;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
  * Sets the percentage of the coin bar and updates the image based on the new percentage.
  * @param {number} percentage - The new percentage value (0-100).
  * @function
  */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
 * Resolves the image index based on the current percentage.
 * @returns {number} The index of the image to be displayed.
 * @function
 */
    resolveImageIndex() {
        return this.calculateIndexBasedOnPercentage(this.percentage);
    }

    /**
 * Calculates the image index based on the given percentage.
 * The index determines which image is displayed based on the percentage range.
 * @param {number} percentage - The percentage of the coin bar.
 * @returns {number} The index corresponding to the percentage range.
 * @function
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