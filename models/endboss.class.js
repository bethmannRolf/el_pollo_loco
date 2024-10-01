class Endboss extends MovableObject {


    y = 140;
    height = 300;
    width = 300;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G24.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];



    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 3800
        this.animate()

    }


    animate() {
        setInterval(() => {
            if (this.world && this.world.character) { // Sicherstellen, dass die Welt und der Charakter existieren
                const distance = this.calculateDistance(this.world.character);
                this.updateAnimation(distance);
            }
        }, 100); // Beispielintervall
    }

    calculateDistance(character) {
        return Math.abs(character.x - this.x); // Distanzberechnung
    }

    updateAnimation(distanceToCharacter) {
        if (distanceToCharacter < 200) {
            this.playAnimation(this.IMAGES_ATTACK); // Wenn der Charakter nahe ist
        } else if (distanceToCharacter < 400) {
            this.playAnimation(this.IMAGES_ALERT); // Wenn der Charakter in der Nähe ist
        } else {
            this.playAnimation(this.IMAGES_WALKING); // Wenn der Charakter weiter weg ist
        }
    }
    


    getDistanceToCharacter(character) {
        return Math.abs(this.x - character.x); // Differenz in der x-Richtung
    }





}