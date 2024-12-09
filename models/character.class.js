class Character extends MovableObject {

    height = 250;
    y = 180;
    speed = 5;
    lastPressTime = null;
    snoring = false;
  

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'

    ];

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;

    /**
 * Creates an instance of the class and initializes various properties related to the character's state.
 * - Loads character images for different actions (walking, jumping, dead, hurt, idle).
 * - Applies gravity and initializes other necessary properties for animation and input handling.
 */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.getPressTime();
        this.animate();
    }

/**
 * Calculates the time elapsed since the last key press.
 * This method checks the time difference between the current time and the 
 * last recorded key press time. If no key has been pressed yet (i.e., 
 * `lastPressTime` is `null`), it returns `null`.
 * @returns {number|null} The time in milliseconds since the last key press, or `null` if no key press has occurred.
 */
    getTimeSinceLastPress() {
        if (this.lastPressTime === null) {
            return null;
        }
        let currentTime = new Date().getTime();
        return currentTime - this.lastPressTime;
    }

/**
 * Tracks the time of the last key press by monitoring specific keyboard inputs.
 * This method sets an interval to periodically check if any of the specified keys 
 * (RIGHT, LEFT, UP, DOWN, or D) are pressed. If any of these keys are pressed, 
 * the time of the last key press is recorded in `lastPressTime`.
 */
    getPressTime() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.D) {
                this.lastPressTime = new Date().getTime();
            }
        }, 50);
    }

    walking_sound = new Audio('audio/walking_1.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    snore_sound = new Audio('audio/snoring1.mp3');

/**
 * Starts the animation process for the character, including movement and state animations.
 * This method sets up the movement animation and state animation for the character. 
 * It calls `setupMovementAnimation()` to handle movement updates (e.g., horizontal movement and jumping),
 * and `setupStateAnimation()` to manage different character states (e.g., walking, idle, dead, hurt).
 */
    animate() {
        this.setupMovementAnimation();
        this.setupStateAnimation();
    }

/**
 * Sets up the movement animation by repeatedly handling horizontal movement, jumping, 
 * and adjusting the camera position based on the character's current position.
 * This method runs at a constant frame rate of approximately 60 frames per second, 
 * ensuring smooth animation updates for movement and jumping. It also updates the camera 
 * position to follow the character, with the camera's `x` coordinate adjusted 
 * relative to the character's `x` position.
 */
    setupMovementAnimation() {
        setInterval(() => {
            this.handleHorizontalMovement();
            this.handleJumping();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
 * Handles the character's horizontal movement based on keyboard input.
 * If the RIGHT arrow key is pressed and the character is not beyond the level's end,
 * the character will move right. If the LEFT arrow key is pressed and the character is
 * not at the left edge of the level, the character will move left. The direction of movement 
 * is tracked by the `otherDirection` flag. While the character is moving, the walking sound is played.
 * If neither direction key is pressed, the walking sound is stopped.
 */
    handleHorizontalMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSound();
        } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
        } else {
            this.stopWalkingSound();
        }
    }

/**
 * Handles the character's jumping action.
 * If the UP arrow key is pressed and the character is not already above ground, 
 * the character will jump. Additionally, if the game is not muted, the jump sound will play.
 * If an error occurs during the sound playback, it will be logged to the console.
 */
    handleJumping() {
        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            if (!isMuted) {
                this.jump_sound.play().catch(error => console.log(error));
            }
        }
    }

/**
 * Plays the walking sound if the character is not above ground, the sound is not muted, and the sound is not already playing.
 * This method checks if the character is not above the ground, if the game is not muted, and if the walking sound is paused. 
 * If all conditions are met, the walking sound is played. Any errors during playback are caught and logged.
 */
    playWalkingSound() {
        if (!this.isAboveGround() && !isMuted && this.walking_sound.paused) {
            this.walking_sound.play().catch(error => console.log(error));
        }
    }

/**
 * Pauses the walking sound if it is currently playing.
 * This method checks if the walking sound is not already paused, and if it is playing, it pauses it.
 */
    stopWalkingSound() {
        if (!this.walking_sound.paused) {
            this.walking_sound.pause();
        }
    }

/**
 * Updates the snoring state of the character by setting the `snoring` flag to `false`
 * and then calling the `snore()` method to manage the snoring sound accordingly.
 */
    setupStateAnimation() {
        setInterval(() => {
            this.updateSnoring();
            this.handleCharacterState();
        }, 50);
    }

/**
 * Updates the character's snoring state and triggers the snoring sound or animation.
 * - Sets the `snoring` property to `false` to reset the snoring state.
 * - Calls the `snore()` method to handle the actual snoring behavior, such as playing the sound or triggering an animation.
 */    
    updateSnoring() {
        this.snoring = false;
        this.snore();
    }

    /**
 * Handles the character's state and triggers the appropriate animation or action based on the character's current status.
 * The method checks the character's state by evaluating various conditions such as whether the character is dead, hurt, idle, 
 * jumping, or walking. Based on the state, it triggers the appropriate animation or action.
 * The sequence of states checked:
 * - If the character is dead, the "dead" animation is played.
 * - If the character is hurt, the "hurt" animation is played.
 * - If the character is idle for a significant amount of time, the "idle" state is triggered.
 * - If the character is in the air, the "jumping" animation is played.
 * - If the character is moving horizontally, the "walking" animation is played.
 * 
 * @see #getTimeSinceLastPress() to calculate the time since the last key press.
 * @see #isDead() to check if the character is dead.
 * @see #isHurt() to check if the character is hurt.
 * @see #isIdle() to check if the character is idle.
 * @see #isAboveGround() to check if the character is in the air (jumping).
 * @see #playAnimation() to play the appropriate animation based on the state.
 */
    handleCharacterState() {
        let timeSinceLastPress = this.getTimeSinceLastPress();
        if (this.isDead()) {
            this.playDeadState();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isIdle(timeSinceLastPress)) {
            this.playIdleState(timeSinceLastPress);
        } else if (this.speedY > 0 ) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround())  {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


/*
    handleCharacterState() {
        let timeSinceLastPress = this.getTimeSinceLastPress();
        if (this.isDead()) {
            this.playDeadState();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isIdle(timeSinceLastPress)) {
            this.playIdleState(timeSinceLastPress);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

*/


    /**
 * Plays the "dead" animation and triggers the end of the game.
 * This method plays the death animation for the character and, after a short delay, 
 * sets the `win` flag to `false` and stops the game.
 * @see stopGame() - Stops the game and triggers the game-over sequence.
 */
    playDeadState() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            win = false;
            stopGame();
        }, 1200);
    }

    /**
 * Checks if the character is idle based on the time since the last key press.
 * The character is considered idle if it is not above the ground and 
 * the time since the last key press exceeds 2000 milliseconds.
 * @param {number} timeSinceLastPress - The time (in milliseconds) since the last key press.
 * @returns {boolean} True if the character is idle, false otherwise.
 */
    isIdle(timeSinceLastPress) {
        return !this.isAboveGround() && (timeSinceLastPress >= 2000);
    }

    /**
 * Plays the appropriate idle animation based on the time since the last key press.
 * If the character has been idle for more than 7000 milliseconds and the game is still ongoing,
 * the long idle animation is played, and the character starts snoring.
 * Otherwise, the regular idle animation is played.
 * @param {number} timeSinceLastPress - The time (in milliseconds) since the last key press.
 */
    playIdleState(timeSinceLastPress) {
        if (timeSinceLastPress >= 7000 && inGame) {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            this.snoring = true;
            this.snore();
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
 * Plays or pauses the snoring sound based on the current snoring state and mute status.
 * If the character is snoring and the game is not muted, the snoring sound is played.
 * Otherwise, the snoring sound is paused.
 */
    snore() {
        if (this.snoring == true && isMuted == false) {
            this.snore_sound.play();
        }
        else {
            this.snore_sound.pause();
        }
    }
}