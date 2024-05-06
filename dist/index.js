"use strict";
const DEAD_COLOR = '#000000';
const COLOR_PALETTES = [
    [
        "#1a1c2c",
        "#5d275d",
        "#b13e53",
        "#ef7d57",
        "#ffcd75",
        "#a7f070",
        "#38b764",
        "#257179",
        "#29366f",
        "#3b5dc9",
        "#41a6f6",
        "#73eff7",
        "#f4f4f4",
        "#94b0c2",
        "#566c86",
        "#333c57",
    ],
    [
        "#ffffff",
        "#0ce6f2",
        "#0098db",
        "#1e579c",
        "#203562",
        "#252446",
        "#201533",
    ],
];
const COLOR_PALETTE = COLOR_PALETTES[0];
const CELL_SIZE = 6;
const canvas = document.querySelector("#board");
const ctx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
if (canvas) {
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 180;
}
else {
    throw new Error("Stuff");
}
const context = canvas.getContext("2d");
const ROWS = Math.floor(canvas.height / CELL_SIZE);
const COLUMNS = Math.floor(canvas.width / CELL_SIZE);
const gof = new GameOfLife(ROWS, COLUMNS);
gof.initialize();
console.log(gof.board);
// draw once
const draw = (surface, board) => {
    if (!surface) {
        return;
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let color = DEAD_COLOR;
            if (board[i][j] == 1) {
                color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length - 1)];
            }
            surface.fillStyle = color;
            surface.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
};
draw(context, gof.board);
window.onload = () => {
    var _a, _b, _c;
    let isRunning = false;
    (_a = document.querySelector("#start")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
        isRunning = true;
    });
    (_b = document.querySelector("#pause")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        isRunning = false;
    });
    (_c = document.querySelector("#reset")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
        isRunning = false;
        gof.randomize();
    });
    const gameLoop = () => {
        if (isRunning) {
            gof.update();
        }
        draw(context, gof.board);
        window.requestAnimationFrame(gameLoop);
    };
    window.requestAnimationFrame(gameLoop);
};
