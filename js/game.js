let canvas;
let world;
let keyboard = new Keyboard();
let win = false;
let background_music = new Audio('audio/background_music1.mp3');
let isMuted = true;
let winning_sound = new Audio('audio/win_sound.mp3');
let losing_sound = new Audio('audio/game_lose2.mp3');
let inGame = true;
let isFullscreen = false;
let firstEndbossContact = false;
let endbossCounter = false

/**
 * Initializes the game and all necessary components.
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
 * The listener triggers the `handleKeyDown` function whenever a key is pressed.
 */
function setupKeyboardListeners() {
    window.addEventListener("keydown", handleKeyDown);
}

/**
 * Handles the "keydown" event and delegates actions based on the key pressed.
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
 */
function handleArrowKeys(e) {
    if (e.keyCode === 39) setKeyboardState('RIGHT', true);
    if (e.keyCode === 37) setKeyboardState('LEFT', true);
    if (e.keyCode === 38) setKeyboardState('UP', true);
    if (e.keyCode === 40) setKeyboardState('DOWN', true);
}

/**
 * Processes action key presses and updates the keyboard state accordingly.
 */
function handleActionKeys(e) {
    if (e.keyCode === 32) setKeyboardState('SPACE', true);
    if (e.keyCode === 68) setKeyboardState('D', true);
}

/**
 * Updates the state of a specified key in the keyboard object.
 */
function setKeyboardState(key, state) {
    keyboard[key] = state;
}

window.addEventListener("keyup", (e) => handleKeyRelease(e));

/**
 * Handles the "keyup" event and delegates actions based on the key released.
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
 */
function handleArrowKeyRelease(e) {
    if (e.keyCode === 39) setKeyboardState('RIGHT', false);
    if (e.keyCode === 37) setKeyboardState('LEFT', false);
    if (e.keyCode === 38) setKeyboardState('UP', false);
    if (e.keyCode === 40) setKeyboardState('DOWN', false);
}

/**
 * Processes the release of action keys and updates the keyboard state accordingly.
 */
function handleActionKeyRelease(e) {
    if (e.keyCode === 32) setKeyboardState('UP', false);
    if (e.keyCode === 68) setKeyboardState('D', false);
}

/**
 * Updates the state of a specified key in the keyboard state object.
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
 */
function handleTouchStart(key, event) {
    keyboard[key] = true;
    event.preventDefault();
}

/**
 * Handles the touchend event for on-screen buttons and updates the keyboard state.
 * Sets the specified key state to `false` when a touch interaction ends and prevents
 * the default behavior of the event to ensure proper interaction handling.
 */
function handleTouchEnd(key, event) {
    keyboard[key] = false;
    event.preventDefault();
}

/**
 * Stops the game and handles all end-game actions.
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
 */
function clearAllIntervals() {
    for (let i = 1; i < 999; i++) {
        window.clearInterval(i);
    }
}

/**
 * Draws the outro overlay image on the designated canvas.
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
 */
function replayGame() {
    location.reload();
    document.getElementById('replay-button').classList.add('d-none')
}

/**
 * Initializes and displays the start screen.
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
        if (isTablet() && !isFullscreen ) {
            document.getElementById('container-control').style.bottom = '-100px'    
        }
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
        applySmartphoneStyles()
        toggleMobileControls();
    }, 100);
}



/**
 * Checks if the current device is a mobile device or tablet.
 */
function isMobileDevice() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let isMobileOrTablet = /android|iphone|ipad|ipod|mobile|tablet/i.test(userAgent);
    let hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isMobileOrTablet || hasTouchSupport;
}


/**
 * Detects if the current device is a smartphone.
 */
function isSmartphone() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let maxWidth = 767; 
    return /android|iphone|ipod|mobile/i.test(userAgent) || window.innerWidth <= maxWidth;
}

/**
 * Applies specific styles for smartphones by dynamically injecting a style element into the document head.
 * The styles are retrieved from the `controlPanelForTabletStyle()` function.
 */
function applySmartphoneStyles() {
    if (isSmartphone()) {
        const style = document.createElement('style');
        style.innerHTML = controlPanelForTabletStyle();
        document.head.appendChild(style);
    }
}

/**
 * Detects if the current device is a tablet.
 * @returns {boolean} True if the device is a tablet, false otherwise.
 */
function isTablet() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let minWidth = 768; // Standard breakpoint for tablets
    let maxWidth = 1024; // Maximum width for most tablets in portrait mode
    let isTabletDevice = /ipad|tablet/i.test(userAgent);
    
    // Tablets often have width between 768px and 1024px
    return isTabletDevice || (window.innerWidth >= minWidth && window.innerWidth <= maxWidth);
}

/**
 * Checks the device type and updates the visibility of the fullscreen button.
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

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);

/**
 * Toggles between entering and exiting fullscreen mode.
 */
function toggleFullscreen() {
    let canvas = document.getElementById('game-container');
    let fullscreenButton = document.getElementById('fullscreen-image');
    if (!document.fullscreenElement) {
        enterFullscreen(canvas);
        fullscreenButton.src = 'img/button_image/exitFullscreen.svg';
        isFullscreen = true
    } else {
        exitFullscreen();
        fullscreenButton.src = 'img/button_image/enterFullscreen.svg';
        isFullscreen = false
    }
}

/**
 * Attempts to enter fullscreen mode for the provided canvas element.
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
 */
function showHelp() {
    document.getElementById('game-container').classList.add('show-help');
    setTimeout(() => {
        document.addEventListener('click', closeHelpOnOutsideClick);
    }, 0);
}

/**
 * Closes the help window by hiding the help overlay on the game container.
 */
function closeHelp() {
    document.getElementById('game-container').classList.remove('show-help');
    document.removeEventListener('click', closeHelpOnOutsideClick);
}

/**
 * Closes the help window if a click outside the help overlay or close button is detected.
 */
function closeHelpOnOutsideClick(event) {
    let helpOverlay = document.getElementById('helpOverlay');
    let closeButton = document.getElementById('help-close-button');
    if (!helpOverlay.contains(event.target) && event.target !== closeButton) {
        closeHelp();
    }
}