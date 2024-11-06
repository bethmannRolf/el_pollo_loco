class Level {

    enemies;
    clouds;
    backgroundObjects;
    collectableCoinObjects;
    collectableBottleObjects;
    level_end_x = 4500;

    constructor(enemies, clouds, backgroundObjects, collectableCoinObjects, collectableBottleObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableCoinObjects = collectableCoinObjects;
        this.collectableBottleObjects = collectableBottleObjects;
    }
}