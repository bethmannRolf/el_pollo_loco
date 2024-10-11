
let canvas;
let world;
let keyboard = new Keyboard();
win = false;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);




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
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})

function stopGame() {
    // Stop all intervals
    clearAllIntervals();
    drawOverlayOutroImage();
    document.getElementById('replay-button').classList.remove('d-none');

}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

// Rufe die stopGame Funktion auf, wenn der Endboss tot ist
// if (world.level.enemies.every(enemy => enemy.isDead())) {
//     stopGame();
// }

function drawOverlayOutroImage() {
    document.getElementById('overlay-canvas-outro').classList.remove('d-none')
    const overlayCanvas = document.getElementById('overlay-canvas-outro');
    const overlayContext = overlayCanvas.getContext('2d');

    const image = new Image();
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
    location.reload();
    document.getElementById('replay-button').classList.add('d-none')
}

