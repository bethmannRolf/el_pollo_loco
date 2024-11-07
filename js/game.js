let canvas;
let world;
let keyboard = new Keyboard();
let win = false;
let background_music = new Audio('audio/background_music1.mp3');
let isMuted = false;
let winning_sound = new Audio('audio/win_sound.mp3');
let losing_sound = new Audio('audio/game_lose2.mp3');
let inGame = true;









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
   
    document.getElementById('button-left').addEventListener('touchstart', (e) => {
        keyboard.LEFT = true;
        e.preventDefault();
    });
    document.getElementById('button-right').addEventListener('touchstart', (e) => {
        keyboard.RIGHT = true;
        e.preventDefault();
    });
    document.getElementById('button-jump').addEventListener('touchstart', (e) => {
        keyboard.UP = true;
        e.preventDefault();
    });
    document.getElementById('button-throw').addEventListener('touchstart', (e) => {
        keyboard.D = true;
        e.preventDefault();
    });

   
    document.getElementById('button-left').addEventListener('touchend', (e) => {
        keyboard.LEFT = false;
        e.preventDefault();
    });
    document.getElementById('button-right').addEventListener('touchend', (e) => {
        keyboard.RIGHT = false;
        e.preventDefault();
    });
    document.getElementById('button-jump').addEventListener('touchend', (e) => {
        keyboard.UP = false;
        e.preventDefault();
    });
    document.getElementById('button-throw').addEventListener('touchend', (e) => {
        keyboard.D = false;
        e.preventDefault();
    });
});

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

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

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

function replayGame() {
    // initStartScreen(); 
    // world = null

    location.reload();
    document.getElementById('replay-button').classList.add('d-none')
}

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


function toggleMobileControls() {
    if (isMobileDevice()) {
        document.getElementById('container-control').classList.remove('d-none');
    } else {
        document.getElementById('container-control').classList.add('d-none');
    }
}





function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

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


function toggleFullscreen() {
    let canvas = document.getElementById('game-container');
    let fullscreenButton = document.getElementById('fullscreen-image');
    if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
        }
        fullscreenButton.src = 'img/button_image/exitFullscreen.svg';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        fullscreenButton.src = 'img/button_image/enterFullscreen.svg';
        console.log('not-fullscreen')
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

function showHelp() {
    document.getElementById('game-container').classList.add('show-help');
    setTimeout(() => {
        document.addEventListener('click', closeHelpOnOutsideClick);
    }, 0);
}

function closeHelp() {
    document.getElementById('game-container').classList.remove('show-help');
    document.removeEventListener('click', closeHelpOnOutsideClick);
}

function closeHelpOnOutsideClick(event) {
    let helpOverlay = document.getElementById('helpOverlay');
    let closeButton = document.getElementById('help-close-button');
    if (!helpOverlay.contains(event.target) && event.target !== closeButton) {
        closeHelp();
    }
}