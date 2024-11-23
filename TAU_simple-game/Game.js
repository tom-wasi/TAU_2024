const fs = require('fs');

class Game {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
        this.start = this.placeStartStop('A');
        this.stop = this.placeStartStop('B');
        this.placeObstacles();
    }

    createGrid() {
        return Array.from({ length: this.rows }, () => Array(this.cols).fill('.'));
    }

    placeStartStop(marker) {
        let position;
        do {
            position = this.getRandomEdgePosition();
        } while (this.grid[position.row][position.col] !== '.');
        this.grid[position.row][position.col] = marker;
        return position;
    }

    getRandomEdgePosition() {
        const edge = Math.floor(Math.random() * 4);
        let row, col;
        switch (edge) {
            case 0: // top edge
                row = 0;
                col = Math.floor(Math.random() * this.cols);
                break;
            case 1: // bottom edge
                row = this.rows - 1;
                col = Math.floor(Math.random() * this.cols);
                break;
            case 2: // left edge
                row = Math.floor(Math.random() * this.rows);
                col = 0;
                break;
            case 3: // right edge
                row = Math.floor(Math.random() * this.rows);
                col = this.cols - 1;
                break;
        }
        return { row, col };
    }

    placeObstacles() {
        const obstacleCount = Math.floor((this.rows * this.cols) / 5);
        for (let i = 0; i < obstacleCount; i++) {
            let row, col;
            do {
                row = Math.floor(Math.random() * this.rows);
                col = Math.floor(Math.random() * this.cols);
            } while (this.grid[row][col] !== '.');
            this.grid[row][col] = 'X';
        }
    }

    displayGrid() {
        console.log(this.grid.map(row => row.join(' ')).join('\n'));
    }

    moveUp(position) {
        if (position.row > 0 && this.grid[position.row - 1][position.col] !== 'X') {
            return { row: position.row - 1, col: position.col };
        } else if (position.row === 0) {
            console.log("Cannot move up, already at the top edge.");
        } else {
            console.log("Cannot move up, obstacle encountered.");
        }
        return position;
    }

    moveDown(position) {
        if (position.row < this.rows - 1 && this.grid[position.row + 1][position.col] !== 'X') {
            return { row: position.row + 1, col: position.col };
        } else if (position.row === this.rows - 1) {
            console.log("Cannot move down, already at the bottom edge.");
        } else {
            console.log("Cannot move down, obstacle encountered.");
        }
        return position;
    }

    moveLeft(position) {
        if (position.col > 0 && this.grid[position.row][position.col - 1] !== 'X') {
            return { row: position.row, col: position.col - 1 };
        } else if (position.col === 0) {
            console.log("Cannot move left, already at the left edge.");
        } else {
            console.log("Cannot move left, obstacle encountered.");
        }
        return position;
    }

    moveRight(position) {
        if (position.col < this.cols - 1 && this.grid[position.row][position.col + 1] !== 'X') {
            return { row: position.row, col: position.col + 1 };
        } else if (position.col === this.cols - 1) {
            console.log("Cannot move right, already at the right edge.");
        } else {
            console.log("Cannot move right, obstacle encountered.");
        }
        return position;
    }

    exportGridToFile(filename) {
        const gridString = this.grid.map(row => row.join(' ')).join('\n');
        fs.writeFileSync(filename, gridString);
    }
}

module.exports = Game;