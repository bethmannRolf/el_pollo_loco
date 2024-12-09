let level1

let layerWidth = 719;

function initLevel() {
    level1 = new Level(
        createEnemies(),
        createClouds(),
        createAlternatingBackgrounds(),
        createCollectableCoins(),
        createCollectableBottles()
    );
}

function createEnemies() {
    return [
        new Chicken(), new Chicken(), new Chicken(),
        new Chicken(), new Chicken(), new Chicken(),
        new SmallChicken(), new SmallChicken(),
        new SmallChicken(), new SmallChicken(),
        new Endboss()
    ];
}

function createClouds() {
    return [new Cloud(), new Cloud(), new Cloud(), new Cloud()];
}

function createAlternatingBackgrounds() {
    let positions = calculatePositions(15, layerWidth, 7);
    return positions.flatMap((pos, index) => createBackgroundLayer(pos, index));
}

function calculatePositions(count, offset, center) {
    return Array.from({ length: count }, (_, i) => (i - center) * offset);
}

function createBackgroundLayer(pos, index) {
    const layers = selectLayerSet(index);
    return [
        createAirLayer(pos),
        ...createDynamicLayers(layers, pos)
    ];
}

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

function createAirLayer(pos) {
    return new BackgroundObject('img/5_background/layers/air.png', pos);
}

function createDynamicLayers(layers, pos) {
    return layers.map(image => new BackgroundObject(image, pos));
}

function createCollectableCoins() {
    return Array.from({ length: 5 }, () => new CollectableCoinObject());
}

function createCollectableBottles() {
    return Array.from({ length: 5 }, () => new CollectableBottleObject());
}