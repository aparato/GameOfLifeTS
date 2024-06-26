"use strict";
class GameOfLife {
    constructor(rows, columns) {
        this.board = [[0]];
        this.rows = rows;
        this.columns = columns;
    }
    getValue(row, col) {
        try {
            return this.board[row][col];
        }
        catch (_a) {
            return 0;
        }
    }
    setValue(row, col, val) {
        this.board[row][col] = val;
    }
    countNeighbors(row, col) {
        let count = 0;
        count += this.getValue(row - 1, col);
        count += this.getValue(row - 1, col + 1);
        count += this.getValue(row, col + 1);
        count += this.getValue(row + 1, col + 1);
        count += this.getValue(row + 1, col);
        count += this.getValue(row + 1, col - 1);
        count += this.getValue(row, col - 1);
        count += this.getValue(row - 1, col - 1);
        return count;
    }
    initialize() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.board[i][j] = 0;
            }
        }
        this.randomize();
    }
    randomize() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.board[i][j] = (Math.random() > 0.5) ? 1 : 0;
            }
        }
    }
    update() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const total = this.countNeighbors(i, j);
                if (total > 4 || total < 3) {
                    this.board[i][j] = 0;
                }
                else if (this.board[i][j] === 0 && total === 3) {
                    this.board[i][j] = 1;
                }
            }
        }
    }
}
