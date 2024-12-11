let level1
let layerWidth = 719;

/**
 * Initializes the game level by creating a new instance of the `Level` class.
 * 
 * Populates the level with dynamically generated elements, such as enemies, clouds, 
 * background objects, collectible coins, and collectible bottles.
 * 
 * This function sets the global `level1` variable to the newly created level instance.
 */
function initLevel() {
    level1 = new Level(
        createEnemies(),
        createClouds(),
        createAlternatingBackgrounds(),
        createCollectableCoins(),
        createCollectableBottles()
    );
}

/**
 * Creates and returns an array of enemy objects for the game level.
 * 
 * Includes a combination of regular chickens, small chickens, and an end boss.
 * These enemy objects are instances of their respective classes.
 * 
 * @returns {Array} An array of enemy objects including `Chicken`, `SmallChicken`, and `Endboss`.
 */
function createEnemies() {
    return [
        new Chicken(), new Chicken(), new Chicken(),
        new Chicken(), new Chicken(), new Chicken(),
        new SmallChicken(), new SmallChicken(),
        new SmallChicken(), new SmallChicken(),
        new Endboss()
    ];
}

/**
 * Creates and returns an array of cloud objects for the game level.
 * 
 * Each cloud object is an instance of the `Cloud` class.
 * 
 * @returns {Array} An array of `Cloud` objects.
 */
function createClouds() {
    return [new Cloud(), new Cloud(), new Cloud(), new Cloud()];
}

/**
 * Creates and returns an array of alternating background layers for the game level.
 * 
 * Positions for the layers are calculated dynamically, and the layers are generated
 * by mapping each position to a background creation function.
 * 
 * @returns {Array} An array of background layer objects for the level.
 */
function createAlternatingBackgrounds() {
    let positions = calculatePositions(15, layerWidth, 7);
    return positions.flatMap((pos, index) => createBackgroundLayer(pos, index));
}

/**
 * Calculates an array of positions based on the given parameters.
 * 
 * Generates positions by iterating a specified number of times (`count`), offsetting 
 * each position by a fixed amount, and centering them around a specified point.
 * 
 * @param {number} count - The total number of positions to generate.
 * @param {number} offset - The distance between consecutive positions.
 * @param {number} center - The index to use as the center point for calculations.
 * @returns {Array<number>} An array of calculated positions.
 */
function calculatePositions(count, offset, center) {
    return Array.from({ length: count }, (_, i) => (i - center) * offset);
}

/**
 * Creates and returns an array of background layer objects for a specific position.
 * 
 * Combines a static air layer with dynamically generated layers based on the provided position
 * and index. The layers are selected from a predefined set of layers.
 * 
 * @param {number} pos - The horizontal position of the background layer.
 * @param {number} index - The index used to select the appropriate set of layers.
 * @returns {Array<Object>} An array of background layer objects, including static and dynamic layers.
 */
function createBackgroundLayer(pos, index) {
    const layers = selectLayerSet(index);
    return [
        createAirLayer(pos),
        ...createDynamicLayers(layers, pos)
    ];
}

/**
 * Selects and returns a set of background layer image paths based on the given index.
 * 
 * Alternates between two sets of image paths depending on whether the index is even or odd.
 * 
 * @param {number} index - The index used to determine which set of layer images to return.
 * @returns {Array<string>} An array of image paths for the selected layer set.
 */
function selectLayerSet(index) {
    return index % 2 === 0
        ? [
            'img/5_background/layers/3_third_layer/2.png',
            'img/5_background/layers/2_second_layer/2.png',
            'img/5_background/layers/1_first_layer/2.png'
        ]
        : [
            'img/5_background/layers/3_third_layer/1.png',
            'img/5_background/layers/2_second_layer/1.png',
            'img/5_background/layers/1_first_layer/1.png'
        ];
}

/**
 * Creates and returns an air layer background object for the specified position.
 * 
 * The air layer is a static background image representing the sky or atmosphere.
 * 
 * @param {number} pos - The horizontal position of the air layer.
 * @returns {BackgroundObject} An instance of `BackgroundObject` representing the air layer.
 */
function createAirLayer(pos) {
    return new BackgroundObject('img/5_background/layers/air.png', pos);
}

/**
 * Creates and returns an array of dynamic background layer objects based on the provided image paths.
 * 
 * Each layer corresponds to an image from the `layers` array and is positioned at the specified `pos`.
 * 
 * @param {Array<string>} layers - An array of image paths for the background layers.
 * @param {number} pos - The horizontal position for each background layer.
 * @returns {Array<BackgroundObject>} An array of `BackgroundObject` instances representing the dynamic layers.
 */
function createDynamicLayers(layers, pos) {
    return layers.map(image => new BackgroundObject(image, pos));
}

/**
 * Creates and returns an array of collectable coin objects for the game level.
 * 
 * Generates a specified number of collectable coins, each represented by an instance 
 * of the `CollectableCoinObject` class.
 * 
 * @returns {Array<CollectableCoinObject>} An array of `CollectableCoinObject` instances.
 */
function createCollectableCoins() {
    return Array.from({ length: 5 }, () => new CollectableCoinObject());
}

/**
 * Creates and returns an array of collectable bottle objects for the game level.
 * 
 * Generates a specified number of collectable bottles, each represented by an instance 
 * of the `CollectableBottleObject` class.
 * 
 * @returns {Array<CollectableBottleObject>} An array of `CollectableBottleObject` instances.
 */
function createCollectableBottles() {
    return Array.from({ length: 5 }, () => new CollectableBottleObject());
}