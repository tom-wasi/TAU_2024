/**
 * @fileoverview Unit tests for the Game class movement methods.
 * @requires ./Game
 */

describe('Game movement tests', () => {
    let game;
    let startPosition;

    beforeEach(() => {
        game = new Game(5, 5);
        startPosition = game.start;
    });

    /**
     * Test to ensure moveUp does not move outside the top edge.
     */
    test('moveUp should not move outside the top edge', () => {
        const topEdgePosition = { row: 0, col: 2 };
        const newPosition = game.moveUp(topEdgePosition);
        expect(newPosition).toEqual(topEdgePosition);
    });

    /**
     * Test to ensure moveDown does not move outside the bottom edge.
     */
    test('moveDown should not move outside the bottom edge', () => {
        const bottomEdgePosition = { row: 4, col: 2 };
        const newPosition = game.moveDown(bottomEdgePosition);
        expect(newPosition).toEqual(bottomEdgePosition);
    });

    /**
     * Test to ensure moveLeft does not move outside the left edge.
     */
    test('moveLeft should not move outside the left edge', () => {
        const leftEdgePosition = { row: 2, col: 0 };
        const newPosition = game.moveLeft(leftEdgePosition);
        expect(newPosition).toEqual(leftEdgePosition);
    });

    /**
     * Test to ensure moveRight does not move outside the right edge.
     */
    test('moveRight should not move outside the right edge', () => {
        const rightEdgePosition = { row: 2, col: 4 };
        const newPosition = game.moveRight(rightEdgePosition);
        expect(newPosition).toEqual(rightEdgePosition);
    });

    /**
     * Test to ensure moveUp does not move into an obstacle.
     */
    test('moveUp should not move into an obstacle', () => {
        const obstaclePosition = { row: 2, col: 2 };
        game.grid[1][2] = 'X'; // Place obstacle above
        const newPosition = game.moveUp(obstaclePosition);
        expect(newPosition).toEqual(obstaclePosition);
    });

    /**
     * Test to ensure moveDown does not move into an obstacle.
     */
    test('moveDown should not move into an obstacle', () => {
        const obstaclePosition = { row: 2, col: 2 };
        game.grid[3][2] = 'X'; // Place obstacle below
        const newPosition = game.moveDown(obstaclePosition);
        expect(newPosition).toEqual(obstaclePosition);
    });

    /**
     * Test to ensure moveLeft does not move into an obstacle.
     */
    test('moveLeft should not move into an obstacle', () => {
        const obstaclePosition = { row: 2, col: 2 };
        game.grid[2][1] = 'X'; // Place obstacle to the left
        const newPosition = game.moveLeft(obstaclePosition);
        expect(newPosition).toEqual(obstaclePosition);
    });

    /**
     * Test to ensure moveRight does not move into an obstacle.
     */
    test('moveRight should not move into an obstacle', () => {
        const obstaclePosition = { row: 2, col: 2 };
        game.grid[2][3] = 'X'; // Place obstacle to the right
        const newPosition = game.moveRight(obstaclePosition);
        expect(newPosition).toEqual(obstaclePosition);
    });
});