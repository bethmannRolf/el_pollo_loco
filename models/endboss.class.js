class Endboss extends MovableObject {

    y = 140;
    height = 300;
    width = 300;
    speed = 4

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
        this.animate(this.distanceToCharacter)
        this.checkIfEndbossLeft()
        this.shrinkLevel()
    }

    endboss_cackling = new Audio('audio/cackle3.mp3');

    /**
 * Animates the Endboss by periodically updating its animation based on the distance
 * to the character. Additionally, it plays or pauses the `endboss_cackling` sound
 * depending on the Endboss's state and the mute setting.
 * @function
 * @memberof Endboss
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
        }, 100);
    }

    /**
 * Dynamically shrinks the playable level by updating the `level_end_x` property
 * to the current position (`x`). If the character's position exceeds the new
 * `level_end_x`, the character's position is adjusted to stay within bounds.
 * @function
 * @memberof WorldManager
 */
    shrinkLevel() {
        setInterval(() => {
            if (this.world && this.world.character) {
                this.world.level.level_end_x = this.x;
                if (this.world.level.level_end_x < this.world.character.x) {
                    this.world.character.x = this.world.level.level_end_x;
                }
            }
        }, 100);
    }

    /**
 * Periodically checks if the Endboss has moved off the left side of the screen.
 * If the Endboss's `x` position is less than 0, it triggers a delayed game loss.
 * @function
 * @memberof Endboss
 */
    checkIfEndbossLeft() {
        setInterval(() => {
            if (this.x < 0) {
                setTimeout(() => {
                    win = false;;
                    stopGame();
                }, 2000);
            }
        }, 100);
    }

    /**
     * Calculates the distance between the Endboss and the character.
     * @param {Object} character - The character object to calculate the distance to.
     * @returns {number} The distance between the Endboss and the character.
     * @method calculateDistance
     */
    calculateDistance(character) {
        return Math.abs(character.x - this.x);
    }

    /**
 * Updates the Endboss' animation based on the distance to the character.
 * @param {number} distanceToCharacter - The distance to the character.
 * @method updateAnimation
 */
    updateAnimation(distanceToCharacter) {
        if (this.isDead()) {
            return;}
        if (firstEndbossContact == true && endbossCounter == false) {
            this.playAnimation(this.IMAGES_ALERT)
            endbossCounter = true}
        else if (distanceToCharacter > 45 && firstEndbossContact == true) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft()
        } else {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
     * Returns the distance to the character.
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
            this.energy = 100 - this.hitDamage * this.hitCount
            this.playAnimation(this.IMAGES_HURT);
            if (this.world) {
                this.world.statusBarEndboss.setPercentage(this.energy);
            }
        }
    }

    /**
 * Checks if the Endboss is dead (i.e., hit 3 times).
 * @returns {boolean} True if the Endboss is dead, otherwise false.
 * @method isDead
 */
    isDead() {
        return this.hitCount >= 3;
    }
}