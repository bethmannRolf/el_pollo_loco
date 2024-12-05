class Statusbar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ]

    percentage = 100;

        /**
     * Constructor for initializing the status bar.
     * Loads images, sets the position, size, and initializes the health percentage to 100.
     * 
     * @constructor
     */
    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = -10
        this.width = 200;
        this.height = 60; 
        this.setPercentage(100)
    }

        /**
     * Sets the percentage of the player's health and updates the corresponding image for the status bar.
     * 
     * @param {number} percentage - The health percentage of the player (0-100).
     */
    setPercentage(percentage){
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
        return this.getImageIndexForPercentage(this.percentage);
    }
    
        /**
     * Gets the image index based on the given percentage.
     * 
     * @param {number} percentage - The health percentage of the player (0-100).
     * @returns {number} The index of the image to display.
     */
    getImageIndexForPercentage(percentage) {
        if (percentage == 100) {
            return 5;
        }
        else if (percentage > 80) {
            return 4;
        }
        else if (percentage > 60) {
            return 3;
        }
        else if (percentage > 40) {
            return 2;
        }
        else if (percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    } 
}