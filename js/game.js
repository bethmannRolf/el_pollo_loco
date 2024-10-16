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

function touchOn() {
    document.getElementById('button-left').addEventListener('touchstart', (e) => {
        keyboard.LEFT = true;
        e.preventDefault();
    });
    document.getElementById('button-right').addEventListener('touchstart', (e) => {
        keyboard.RIGHT = true;
        e.preventDefault();
    });
    document.getElementById('button-jump').addEventListener('touchstart', (e) => {
        keyboard.SPACE = true;
        e.preventDefault();
    });
    document.getElementById('button-throw').addEventListener('touchstart', (e) => {
        keyboard.D = true;
        e.preventDefault();
    });

}

function touchOut() {
    document.getElementById('button-left').addEventListener('touchend', (e) => {
        keyboard.LEFT = false;
        e.preventDefault();
    });
    document.getElementById('button-right').addEventListener('touchend', (e) => {
        keyboard.RIGHT = false;
        e.preventDefault();
    });
    document.getElementById('button-jump').addEventListener('touchend', (e) => {
        keyboard.SPACE = false;
        e.preventDefault();
    });
    document.getElementById('button-throw').addEventListener('touchend', (e) => {
        keyboard.D = false;
        e.preventDefault();
    });
}

// Stopped work here
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



//
/*

        // Funktion, um zu überprüfen, ob es sich um ein mobiles Gerät handelt
        function isMobileDevice() {
            return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
        }

        // Überprüft die Ausrichtung und zeigt die Nachricht nur auf mobilen Geräten im Hochformat an
        function checkOrientation() {
            if (isMobileDevice()) {
                if (window.innerWidth < window.innerHeight) {
                    // Hochformat auf mobilen Geräten
                    document.getElementById('rotate-message').style.display = 'flex';
                } else {
                    // Querformat auf mobilen Geräten
                    document.getElementById('rotate-message').style.display = 'none';
                }
            } else {
                // Desktop-Geräte zeigen die Nachricht nicht an
                document.getElementById('rotate-message').style.display = 'none';
            }
        }

        // Überprüfe die Ausrichtung beim Laden der Seite
        window.addEventListener('load', checkOrientation);

        // Überprüfe die Ausrichtung bei jeder Größenänderung des Fensters
        window.addEventListener('resize', checkOrientation);






*/


function toggleFullscreen() {
    let canvas = document.getElementById('canvas');
    if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) { // Firefox
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari, Opera
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) { // IE/Edge
            canvas.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

