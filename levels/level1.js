

const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss()
    ],
    [
        new Cloud()
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png',-719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 2*719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 2*719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 2*719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 2*719),

        new BackgroundObject('img/5_background/layers/air.png', 3*719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 3*719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 3*719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 3*719),

        new BackgroundObject('img/5_background/layers/air.png', 4*719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 4*719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 4*719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 4*719),

        new BackgroundObject('img/5_background/layers/air.png', 5*719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 5*719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 5*719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 5*719),

        new BackgroundObject('img/5_background/layers/air.png', 6*719),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 6*719),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 6*719),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 6*719),

        new BackgroundObject('img/5_background/layers/air.png', 7*719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 7*719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 7*719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 7*719)

    ],


    [
        new CollectableCoinObject(),
        new CollectableCoinObject(),
        new CollectableCoinObject(),
        new CollectableCoinObject()        
    ],
    [
        new CollectableBottleObject()
    ]



    //bottles  and coins

);


