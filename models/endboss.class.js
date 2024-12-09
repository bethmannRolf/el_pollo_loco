class Endboss extends MovableObject {

    y = 140;
    height = 300;
    width = 300;
    energy = 100;

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
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
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

    /**
 * The constructor initializes the Endboss with images and other properties.
 * It also starts the animation loop for the Endboss.
 * 
 * @constructor
 */
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3800;
        this.hitCount = 0;
        this.energy = 100;
        this.hitDamage = 40;
        this.animate()
    }

    endboss_cackling = new Audio('audio/cackle3.mp3');

    /**
     * The animation loop that updates the Endboss' behavior.
     * It checks the distance to the character and updates the Endboss' animation accordingly.
     * It also plays the cackling sound when the Endboss is not dead and sound is not muted.
     * 
     * @method animate
     */
    animate() {
        setInterval(() => {
            if (this.world && this.world.character) {
                let distance = this.calculateDistance(this.world.character);
                this.updateAnimation(distance);
                if (!this.isDead() && !isMuted) {
                    this.endboss_cackling.play();
                }
                else {
                    this.endboss_cackling.pause();
                }
            }
        }, 200);
    }

    /**
     * Calculates the distance between the Endboss and the character.
     * 
     * @param {Object} character - The character object to calculate the distance to.
     * @returns {number} The distance between the Endboss and the character.
     * @method calculateDistance
     */
    calculateDistance(character) {
        return Math.abs(character.x - this.x);
    }

    /**
 * Updates the Endboss' animation based on the distance to the character.
 * 
 * @param {number} distanceToCharacter - The distance to the character.
 * @method updateAnimation
 */
    updateAnimation(distanceToCharacter) {
        if (this.isDead()) {
            return;
        }
        if (distanceToCharacter < 200) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (distanceToCharacter < 400) {
            this.playAnimation(this.IMAGES_ALERT);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    

    /**
     * Returns the distance to the character.
     * 
     * @param {Object} character - The character object.
     * @returns {number} The distance between the Endboss and the character.
     * @method getDistanceToCharacter
     */
    getDistanceToCharacter(character) {
        return Math.abs(this.x - character.x);
    }

    /**
 * Handles when the Endboss is hit by a bottle.
 * It increases the hit count and decreases the Endboss' energy.
 * If the Endboss is hit 3 times, it dies.
 * 
 * @method hitByBottle
 */
    hitByBottle() {
        this.hitCount++;
        if (this.hitCount >= 3) {
            this.energy = 0;
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                win = true;
                stopGame();
            }, 2000);
        } else {
            this.energy = this.energy - this.hitDamage * this.hitCount;
            this.playAnimation(this.IMAGES_HURT);
            if (this.world) {
                this.world.statusBarEndboss.setPercentage(this.energy);
            }
        }
    }

    /**
 * Checks if the Endboss is dead (i.e., hit 3 times).
 * 
 * @returns {boolean} True if the Endboss is dead, otherwise false.
 * @method isDead
 */
    isDead() {
        return this.hitCount >= 3;
    }
}