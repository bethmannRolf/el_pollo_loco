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