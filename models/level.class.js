class Level {
    
    enemies;
    clouds;
    backgroundObjects;
    collectableCoinObjects;
    collectableBottleObjects;
    level_end_x = 4500;

        /**
     * Constructor for initializing a level with its objects.
     * 
     * @constructor
     * @param {MovableObject[]} enemies - The list of enemies in the level.
     * @param {Object[]} clouds - The list of clouds in the level.
     * @param {Object[]} backgroundObjects - The list of background objects in the level.
     * @param {Object[]} collectableCoinObjects - The list of collectible coins in the level.
     * @param {Object[]} collectableBottleObjects - The list of collectible bottles in the level.
     */
    constructor(enemies, clouds, backgroundObjects, collectableCoinObjects, collectableBottleObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableCoinObjects = collectableCoinObjects;
        this.collectableBottleObjects = collectableBottleObjects;
    }
}