let canvas;
let world;
let keyboard = new Keyboard();
let win = false;
let background_music = new Audio('audio/background_music1.mp3');
let isMuted = true;
let winning_sound = new Audio('audio/win_sound.mp3');
let losing_sound = new Audio('audio/game_lose2.mp3');
let inGame = true;
let firstEndbossContact = false;

/**
 * Initializes the game and all necessary components.
 * - Loads the game level.
 * - Sets the game status to active.
 * - Binds the canvas element and creates the game world.
 * - Hides the start screen and displays the control panel.
 * - Activates mobile controls and checks background music.
 * @global {boolean} inGame - Indicates whether the game is active.
 * @global {HTMLElement} canvas - The game's canvas element.
 * @global {World} world - The main game world instance.
 */
function init() {
    frequentlyDeviceCheck()
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

window.addEventListener('load', () => {
    setupKeyboardListeners();
});

/**
 * Adds an event listener to detect keyboard input and handle "keydown" events.
 * 
 * The listener triggers the `handleKeyDown` function whenever a key is pressed.
 */
function setupKeyboardListeners() {
    window.addEventListener("keydown", handleKeyDown);
}

/**
 * Handles the "keydown" event and delegates actions based on the key pressed.
 * @param {KeyboardEvent} e - The keyboard event triggered by a key press.
 * Keys:
 * - Arrow keys (37: Left, 38: Up, 39: Right, 40: Down) trigger `handleArrowKeys`.
 * - Action keys (32: Space, 68: 'D') trigger `handleActionKeys`.
 */
function handleKeyDown(e) {
    if ([39, 37, 38, 40].includes(e.keyCode)) {
        handleArrowKeys(e);
    } else if ([32, 68].includes(e.keyCode)) {
        handleActionKeys(e);
    }
}

/**
 * Processes arrow key presses and updates the keyboard state accordingly.
 * @param {KeyboardEvent} e - The keyboard event triggered by an arrow key press.
 * Keys and their actions:
 * - 39: Sets the 'RIGHT' state to true.
 * - 37: Sets the 'LEFT' state to true.
 * - 38: Sets the 'UP' state to true.
 * - 40: Sets the 'DOWN' state to true.
 */
function handleArrowKeys(e) {
    if (e.keyCode === 39) setKeyboardState('RIGHT', true);
    if (e.keyCode === 37) setKeyboardState('LEFT', true);
    if (e.keyCode === 38) setKeyboardState('UP', true);
    if (e.keyCode === 40) setKeyboardState('DOWN', true);
}

/**
 * Processes action key presses and updates the keyboard state accordingly.
 * @param {KeyboardEvent} e - The keyboard event triggered by an action key press.
 * Keys and their actions:
 * - 32: Sets the 'SPACE' state to true.
 * - 68: Sets the 'D' state to true.
 */
function handleActionKeys(e) {
    if (e.keyCode === 32) setKeyboardState('SPACE', true);
    if (e.keyCode === 68) setKeyboardState('D', true);
}

/**
 * Updates the state of a specified key in the keyboard object.
 * @param {string} key - The key identifier (e.g., 'RIGHT', 'SPACE').
 * @param {boolean} state - The new state of the key (true for pressed, false for released).
 */
function setKeyboardState(key, state) {
    keyboard[key] = state;
}

window.addEventListener("keyup", (e) => handleKeyRelease(e));

/**
 * Handles the "keyup" event and delegates actions based on the key released.
 * @param {KeyboardEvent} e - The keyboard event triggered by a key release.
 * Keys:
 * - Arrow keys (37: Left, 38: Up, 39: Right, 40: Down) trigger `handleArrowKeyRelease`.
 * - Action keys (32: Space, 68: 'D') trigger `handleActionKeyRelease`.
 */
function handleKeyRelease(e) {
    if ([39, 37, 38, 40].includes(e.keyCode)) {
        handleArrowKeyRelease(e);
    } else if ([32, 68].includes(e.keyCode)) {
        handleActionKeyRelease(e);
    }
}

/**
 * Processes the release of arrow keys and updates the keyboard state accordingly.
 * @param {KeyboardEvent} e - The keyboard event triggered by an arrow key release.
 * Keys and their actions:
 * - 39: Sets the 'RIGHT' state to false.
 * - 37: Sets the 'LEFT' state to false.
 * - 38: Sets the 'UP' state to false.
 * - 40: Sets the 'DOWN' state to false.
 */
function handleArrowKeyRelease(e) {
    if (e.keyCode === 39) setKeyboardState('RIGHT', false);
    if (e.keyCode === 37) setKeyboardState('LEFT', false);
    if (e.keyCode === 38) setKeyboardState('UP', false);
    if (e.keyCode === 40) setKeyboardState('DOWN', false);
}

/**
 * Processes the release of action keys and updates the keyboard state accordingly.
 * @param {KeyboardEvent} e - The keyboard event triggered by an action key release.
 * Keys and their actions:
 * - 32: Sets the 'UP' state to false.
 * - 68: Sets the 'D' state to false.
 */
function handleActionKeyRelease(e) {
    if (e.keyCode === 32) setKeyboardState('UP', false);
    if (e.keyCode === 68) setKeyboardState('D', false);
}

/**
 * Updates the state of a specified key in the keyboard state object.
 * @param {string} key - The key identifier (e.g., 'RIGHT', 'SPACE').
 * @param {boolean} state - The new state of the key (true if pressed, false if released).
 */
function setKeyboardState(key, state) {
    keyboard[key] = state;
}

window.addEventListener('load', () => {
    const options = { passive: false };
    initializeTouchEvents(options);
});

/**
 * Initializes touch events for on-screen buttons by setting up their actions.
 * Associates touch interactions with specific keyboard states using the `setupButtonEvent` function.
 * @param {Object} options - Configuration options for touch event setup.
 * @param {string} options - Button identifiers mapping to their corresponding actions:
 *                         - 'button-left' triggers the 'LEFT' state.
 *                         - 'button-right' triggers the 'RIGHT' state.
 *                         - 'button-jump' triggers the 'UP' state.
 *                         - 'button-throw' triggers the 'D' state.
 */
function initializeTouchEvents(options) {
    setupButtonEvent('button-left', 'LEFT', options);
    setupButtonEvent('button-right', 'RIGHT', options);
    setupButtonEvent('button-jump', 'UP', options);
    setupButtonEvent('button-throw', 'D', options);
}

/**
 * Sets up touch event listeners for a specified on-screen button.
 * Associates touch interactions with a specified key by adding 'touchstart' and 'touchend' listeners.
 * @param {string} buttonId - The ID of the HTML button element to associate with the key.
 * @param {string} key - The key identifier (e.g., 'LEFT', 'RIGHT', 'UP', 'D').
 * @param {Object} [options] - Optional event listener configuration.
 * @param {boolean} [options.passive=true] - Indicates if the event listener should be passive.
 */
function setupButtonEvent(buttonId, key, options) {
    const button = document.getElementById(buttonId);
    button.addEventListener('touchstart', (e) => handleTouchStart(key, e), options);
    button.addEventListener('touchend', (e) => handleTouchEnd(key, e), options);
}

/**
 * Handles the touchstart event for on-screen buttons and updates the keyboard state.
 * Sets the specified key state to `true` when a touch interaction starts and prevents
 * the default behavior of the event to avoid unintended interactions.
 * @param {string} key - The key identifier (e.g., 'LEFT', 'RIGHT', 'UP', 'D').
 * @param {TouchEvent} event - The touch event triggered by the user's interaction.
 */
function handleTouchStart(key, event) {
    keyboard[key] = true;
    event.preventDefault();
}

/**
 * Handles the touchend event for on-screen buttons and updates the keyboard state.
 * Sets the specified key state to `false` when a touch interaction ends and prevents
 * the default behavior of the event to ensure proper interaction handling.
 * @param {string} key - The key identifier (e.g., 'LEFT', 'RIGHT', 'UP', 'D').
 * @param {TouchEvent} event - The touch event triggered when the user's touch interaction ends.
 */
function handleTouchEnd(key, event) {
    keyboard[key] = false;
    event.preventDefault();
}

/**
 * Stops the game and handles all end-game actions.
 * - Sets the game status to inactive.
 * - Pauses the background music and clears all active intervals.
 * - Plays the appropriate sound based on the game result (win or lose) if sound is not muted.
 * - Displays the outro overlay image.
 * - Reveals the replay button and hides the control panel.
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
 * - Iterates through a range of possible interval IDs (1 to 999) and clears them.
 * - Ensures that no leftover intervals continue running after being called.
 */
function clearAllIntervals() {
    for (let i = 1; i < 999; i++) {
        window.clearInterval(i);
    }
}

/**
 * Draws the outro overlay image on the designated canvas.
 * - Displays the outro overlay canvas by removing its hidden class.
 * - Loads an image depending on the game result (win or lose).
 * - Draws the image on the overlay canvas once it is fully loaded.
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
 * - Reloads the current page to reset all game components.
 * - Hides the replay button after the game restarts.
 */
function replayGame() {
    location.reload();
    document.getElementById('replay-button').classList.add('d-none')
}

/**
 * Initializes and displays the start screen.
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
 * - Plays the background music if the game is active and sound is not muted.
 * - Pauses the background music if sound is muted.
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
 * - Updates the sound button image to reflect the current sound state.
 * - Sets the `isMuted` flag to true or false.
 * - Calls `checkBackgroundMusic()` to update the background music accordingly.
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
 */
function toggleMobileControls() {
    if (isMobileDevice()) {
        document.getElementById('container-control').classList.remove('d-none');
    } else {
        document.getElementById('container-control').classList.add('d-none');
    }
}

/**
 * Frequently checks the device orientation and toggles controls.
 */
function frequentlyDeviceCheck() {
    setInterval(() => {
        checkOrientation();
        toggleMobileControls();
    }, 100);
}

/**
 * Checks if the device is a mobile device based on the user agent.
 */
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}



/**
 * Checks the device type and updates the visibility of the fullscreen button.
 * - Hides the fullscreen button for smartphones.
 * - Displays the fullscreen button for tablets and larger devices.
 */
function updateFullscreenButtonVisibility() {
    let fullscreenButton = document.getElementById('button-fullscreen');
    let isSmartphone = window.innerWidth <= 932; 
    if (isSmartphone) {
        fullscreenButton.classList.add('d-none');   
    } else {
        fullscreenButton.classList.remove('d-none'); 
    }
}

/**
 * Checks the orientation and manages UI for mobile devices.
 */
function checkOrientation() {
    if (isMobileDevice()) {
        const isLandscape = window.matchMedia('(orientation: landscape)').matches;
        const rotateMessage = document.getElementById('rotate-message');
        
        if (!isLandscape && window.innerWidth < window.innerHeight) {
            rotateMessage.style.display = 'flex';
        } else {
            rotateMessage.style.display = 'none';
        }
    } else {
        document.getElementById('rotate-message').style.display = 'none';
    }
    updateFullscreenButtonVisibility(); 
}




/**
 * Checks the device's orientation and displays a message if the device is in portrait mode.
 */

// function checkOrientation() {
//     if (isMobileDevice()) {
//         // document.getElementById('button-fullscreen').classList.add('d-none')
//         let isLandscape = window.matchMedia('(orientation: landscape)').matches;
//         if (!isLandscape && window.innerWidth < window.innerHeight) {
//             document.getElementById('rotate-message').style.display = 'flex';
//         } else {
//             document.getElementById('rotate-message').style.display = 'none';
//         }
//     } else {
//         document.getElementById('rotate-message').style.display = 'none';
//         // document.getElementById('button-fullscreen').classList.remove('d-none')
//     }
// }

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);

/**
 * Toggles between entering and exiting fullscreen mode.
 * - Enters fullscreen mode for the game container when not in fullscreen.
 * - Exits fullscreen mode when currently in fullscreen.
 * - Updates the fullscreen button image accordingly.
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
 * - Uses different methods to request fullscreen based on the browser's implementation.
 * - Supports standard, Mozilla, WebKit, and Microsoft fullscreen APIs.
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
 * - Uses the standard `exitFullscreen` method to exit fullscreen mode.
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
 * - Adds a class to the game container to display the help overlay.
 * - Sets a timeout to add an event listener for closing the help window when clicked outside.
 */
function showHelp() {
    document.getElementById('game-container').classList.add('show-help');
    setTimeout(() => {
        document.addEventListener('click', closeHelpOnOutsideClick);
    }, 0);
}

/**
 * Closes the help window by hiding the help overlay on the game container.
 * - Removes the class from the game container to hide the help overlay.
 * - Removes the event listener that was added to close the help window when clicked outside.
 */
function closeHelp() {
    document.getElementById('game-container').classList.remove('show-help');
    document.removeEventListener('click', closeHelpOnOutsideClick);
}

/**
 * Closes the help window if a click outside the help overlay or close button is detected.
 * - Checks if the click event occurred outside the help overlay and the close button.
 * - Calls the `closeHelp` function to hide the help window if the click was outside.
 * @param {Event} event - The click event triggered when the user interacts with the page.
 */
function closeHelpOnOutsideClick(event) {
    let helpOverlay = document.getElementById('helpOverlay');
    let closeButton = document.getElementById('help-close-button');
    if (!helpOverlay.contains(event.target) && event.target !== closeButton) {
        closeHelp();
    }
}