let canvas;
let world;
let keyboard = new Keyboard();
let win = false;
let background_music = new Audio('audio/background_music1.mp3');
let isMuted = false;
let winning_sound = new Audio('audio/win_sound.mp3');
let losing_sound = new Audio('audio/game_lose2.mp3');
let inGame = true;

/**
 * Initializes the game and all necessary components.
 *
 * - Loads the game level.
 * - Sets the game status to active.
 * - Binds the canvas element and creates the game world.
 * - Hides the start screen and displays the control panel.
 * - Activates mobile controls and checks background music.
 *
 * @global {boolean} inGame - Indicates whether the game is active.
 * @global {HTMLElement} canvas - The game's canvas element.
 * @global {World} world - The main game world instance.
 */
function init() {
    initLevel()
    inGame = true
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-button').classList.add('d-none');
    document.getElementById('overlay-canvas-start').classList.add('d-none')
    document.getElementById('container-control').classList.remove('d-none');
    toggleMobileControls();
    checkBackgroundMusic()
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true
    }
})

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.UP = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})

window.addEventListener('load', () => {
    let options = { passive: false }; 
    document.getElementById('button-left').addEventListener('touchstart', (e) => {
        keyboard.LEFT = true;
        e.preventDefault();
    }, options);
    
    document.getElementById('button-right').addEventListener('touchstart', (e) => {
        keyboard.RIGHT = true;
        e.preventDefault();
    }, options);

    document.getElementById('button-jump').addEventListener('touchstart', (e) => {
        keyboard.UP = true;
        e.preventDefault();
    }, options);
    
    document.getElementById('button-throw').addEventListener('touchstart', (e) => {
        keyboard.D = true;
        e.preventDefault();
    }, options);

    document.getElementById('button-left').addEventListener('touchend', (e) => {
        keyboard.LEFT = false;
        e.preventDefault();
    }, options);
    
    document.getElementById('button-right').addEventListener('touchend', (e) => {
        keyboard.RIGHT = false;
        e.preventDefault();
    }, options);
    
    document.getElementById('button-jump').addEventListener('touchend', (e) => {
        keyboard.UP = false;
        e.preventDefault();
    }, options);
    
    document.getElementById('button-throw').addEventListener('touchend', (e) => {
        keyboard.D = false;
        e.preventDefault();
    }, options);
});

/**
 * Stops the game and handles all end-game actions.
 *
 * - Sets the game status to inactive.
 * - Pauses the background music and clears all active intervals.
 * - Plays the appropriate sound based on the game result (win or lose) if sound is not muted.
 * - Displays the outro overlay image.
 * - Reveals the replay button and hides the control panel.
 *
 * @global {boolean} inGame - Indicates whether the game is active.
 * @global {boolean} win - Indicates whether the player has won the game.
 * @global {boolean} isMuted - Indicates whether the game sounds are muted.
 * @global {HTMLAudioElement} background_music - The background music audio element.
 * @global {HTMLAudioElement} winning_sound - The sound played when the player wins.
 * @global {HTMLAudioElement} losing_sound - The sound played when the player loses.
 */
function stopGame() {
    inGame = false;
    background_music.pause();
    clearAllIntervals();
    if (win == true && isMuted == false) {
        winning_sound.play();
    }
    else {
        if (win == false && isMuted == false) {
            losing_sound.play();
        }
    }
    drawOverlayOutroImage();
    document.getElementById('replay-button').classList.remove('d-none');
    document.getElementById('container-control').classList.add('d-none');
}

/**
 * Clears all active intervals in the browser.
 *
 * - Iterates through a range of possible interval IDs (1 to 999) and clears them.
 * - Ensures that no leftover intervals continue running after being called.
 *
 * @function
 */
function clearAllIntervals() {
    for (let i = 1; i < 999; i++) {
        window.clearInterval(i);
    }
}

/**
 * Draws the outro overlay image on the designated canvas.
 *
 * - Displays the outro overlay canvas by removing its hidden class.
 * - Loads an image depending on the game result (win or lose).
 * - Draws the image on the overlay canvas once it is fully loaded.
 *
 * @global {boolean} win - Indicates whether the player has won the game.
 */
function drawOverlayOutroImage() {
    document.getElementById('overlay-canvas-outro').classList.remove('d-none')
    let overlayCanvas = document.getElementById('overlay-canvas-outro');
    let overlayContext = overlayCanvas.getContext('2d');
    let image = new Image();
    if (win == true) {
        image.src = 'img/9_intro_outro_screens/win/win_2.png';
    }
    else {
        image.src = 'img/9_intro_outro_screens/game_over/you lost.png';
    }
    image.onload = () => {
        overlayContext.drawImage(image, 0, 0, overlayCanvas.width, overlayCanvas.height);
    };
}

/**
 * Restarts the game by reloading the page.
 *
 * - Reloads the current page to reset all game components.
 * - Hides the replay button after the game restarts.
 */
function replayGame() {
    location.reload();
    document.getElementById('replay-button').classList.add('d-none')
}

/**
 * Initializes and displays the start screen.
 *
 * - Prepares the start canvas and its drawing context.
 * - Shows the start button and the start canvas.
 * - Loads the start screen image and draws it on the canvas once loaded.
 */
function initStartScreen() {
    let startCanvas = document.getElementById('overlay-canvas-start');
    let startContext = startCanvas.getContext('2d');
    document.getElementById('start-button').classList.remove('d-none')
    startCanvas.classList.remove('d-none');
    let image = new Image();
    image.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
    image.onload = () => {
        startContext.drawImage(image, 0, 0, startCanvas.width, startCanvas.height);
    };
}

/**
 * Checks and controls the state of the background music.
 *
 * - Plays the background music if the game is active and sound is not muted.
 * - Pauses the background music if sound is muted.
 *
 * @global {boolean} isMuted - Indicates whether the game sounds are muted.
 * @global {boolean} inGame - Indicates whether the game is currently active.
 * @global {HTMLAudioElement} background_music - The background music audio element.
 */
function checkBackgroundMusic() {
    if (isMuted == false && inGame) {
        background_music.play();
    }
    else {
        if (isMuted == true) {
            background_music.pause();
        }
    }
}

/**
 * Toggles the sound state of the game between muted and unmuted.
 *
 * - Updates the sound button image to reflect the current sound state.
 * - Sets the `isMuted` flag to true or false.
 * - Calls `checkBackgroundMusic()` to update the background music accordingly.
 *
 * @global {boolean} isMuted - Indicates whether the game sounds are muted.
 */
function toggleSound() {
    if (isMuted == false) {
        document.getElementById('sound-image').src = 'img/button_image/soundOff.svg';
        isMuted = true
    }
    else {
        document.getElementById('sound-image').src = 'img/button_image/soundOn.svg';
        isMuted = false;
    }
    checkBackgroundMusic()
}

/**
 * Toggles the visibility of mobile controls based on the device type.
 *
 * - Displays the mobile control container if the device is mobile.
 * - Hides the mobile control container if the device is not mobile.
 *
 * @function
 */
function toggleMobileControls() {
    if (isMobileDevice()) {
        document.getElementById('container-control').classList.remove('d-none');
    } else {
        document.getElementById('container-control').classList.add('d-none');
    }
}

/**
 * Checks if the device is a mobile device based on the user agent.
 *
 * - Uses a regular expression to test the `navigator.userAgent` for mobile device keywords.
 * - Returns `true` if the device is mobile, otherwise returns `false`.
 *
 * @function
 * @returns {boolean} `true` if the device is mobile, `false` otherwise.
 */
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

/**
 * Checks the device's orientation and displays a message if the device is in portrait mode.
 *
 * - Displays a message prompting the user to rotate their device if the device is in portrait mode.
 * - Hides the message if the device is in landscape mode or if the device is not mobile.
 *
 * @function
 */
function checkOrientation() {
    if (isMobileDevice()) {
        if (window.innerWidth < window.innerHeight) {
            document.getElementById('rotate-message').style.display = 'flex';
        } else {
            document.getElementById('rotate-message').style.display = 'none';
        }
    } else {
        document.getElementById('rotate-message').style.display = 'none';
    }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);

/**
 * Toggles between entering and exiting fullscreen mode.
 *
 * - Enters fullscreen mode for the game container when not in fullscreen.
 * - Exits fullscreen mode when currently in fullscreen.
 * - Updates the fullscreen button image accordingly.
 *
 * @function
 */
function toggleFullscreen() {
    let canvas = document.getElementById('game-container');
    let fullscreenButton = document.getElementById('fullscreen-image');
    
    if (!document.fullscreenElement) {
        enterFullscreen(canvas);
        fullscreenButton.src = 'img/button_image/exitFullscreen.svg';
    } else {
        exitFullscreen();
        fullscreenButton.src = 'img/button_image/enterFullscreen.svg';
    }
}

/**
 * Attempts to enter fullscreen mode for the provided canvas element.
 *
 * - Uses different methods to request fullscreen based on the browser's implementation.
 * - Supports standard, Mozilla, WebKit, and Microsoft fullscreen APIs.
 *
 * @function
 * @param {HTMLCanvasElement} canvas - The canvas element that should be displayed in fullscreen.
 */
function enterFullscreen(canvas) {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode if the document is currently in fullscreen.
 *
 * - Uses the standard `exitFullscreen` method to exit fullscreen mode.
 *
 * @function
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

document.addEventListener("fullscreenchange", () => {
    let fullscreenButton = document.getElementById('fullscreen-image');
    if (document.fullscreenElement) {
        fullscreenButton.src = 'img/button_image/exitFullscreen.svg';
    } else {
        fullscreenButton.src = 'img/button_image/enterFullscreen.svg';
    }
});

/**
 * Displays the help window by showing the help overlay on the game container.
 *
 * - Adds a class to the game container to display the help overlay.
 * - Sets a timeout to add an event listener for closing the help window when clicked outside.
 *
 * @function
 */
function showHelp() {
    document.getElementById('game-container').classList.add('show-help');
    setTimeout(() => {
        document.addEventListener('click', closeHelpOnOutsideClick);
    }, 0);
}

/**
 * Closes the help window by hiding the help overlay on the game container.
 *
 * - Removes the class from the game container to hide the help overlay.
 * - Removes the event listener that was added to close the help window when clicked outside.
 *
 * @function
 */
function closeHelp() {
    document.getElementById('game-container').classList.remove('show-help');
    document.removeEventListener('click', closeHelpOnOutsideClick);
}

/**
 * Closes the help window if a click outside the help overlay or close button is detected.
 *
 * - Checks if the click event occurred outside the help overlay and the close button.
 * - Calls the `closeHelp` function to hide the help window if the click was outside.
 *
 * @function
 * @param {Event} event - The click event triggered when the user interacts with the page.
 */
function closeHelpOnOutsideClick(event) {
    let helpOverlay = document.getElementById('helpOverlay');
    let closeButton = document.getElementById('help-close-button');
    if (!helpOverlay.contains(event.target) && event.target !== closeButton) {
        closeHelp();
    }
}