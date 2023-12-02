import { Game } from "./Game.js";

describe('the game', () => {
    let game: Game;
    beforeEach(() => {
        game = new Game(1);
    });

    it('can be created with a game ID', () => {
        // Assert
        expect(game).toBeDefined();
        expect(game.gameId).toEqual(1);
    });

    it('can be created many times with different ids', () => {
        // Arrange
        const game1 = new Game(44);
        const game2 = new Game(45);

        // Assert
        expect(game1).toBeDefined();
        expect(game1.gameId).toEqual(44);
        expect(game2).toBeDefined();
        expect(game2.gameId).toEqual(45);
    });

    it('will have all color maximums to 0 with no cube grabs', () => {
        // Assert
        expect(game.acquireMaxColorCubes()).toEqual(new Map([
            ['red', 0],
            ['green', 0],
            ['blue', 0]
        ]));
    });

    it('will increase the maximum cube count for each color for one handful', () => {
        // Act
        game.randomCubeHandful(new Map([
            ['red', 1],
            ['green', 2],
            ['blue', 6]
        ]));

        // Assert
        expect(game.acquireMaxColorCubes()).toEqual(new Map([
            ['red', 1],
            ['green', 2],
            ['blue', 6]
        ]));
    });

    it('will increase the maximum cube count for only red color cubes for two handfuls', () => {
        // Act
        game.randomCubeHandful(new Map([
            ['red', 5],
            ['green', 2],
            ['blue', 6]
        ]));

        // Act
        game.randomCubeHandful(new Map([
            ['red', 8],
            ['green', 1],
            ['blue', 2]
        ]));

        // Assert
        expect(game.acquireMaxColorCubes()).toEqual(new Map([
            ['red', 8],
            ['green', 2],
            ['blue', 6]
        ]));
    });

    it('will increase the maximum cube count for only green color cubes for two handfuls', () => {
        // Act
        game.randomCubeHandful(new Map([
            ['red', 5],
            ['green', 2],
            ['blue', 6]
        ]));

        // Act
        game.randomCubeHandful(new Map([
            ['red', 2],
            ['green', 6],
            ['blue', 2]
        ]));

        // Assert
        expect(game.acquireMaxColorCubes()).toEqual(new Map([
            ['red', 5],
            ['green', 6],
            ['blue', 6]
        ]));
    });

    it('will increase the maximum cube count for only blue color cubes for two handfuls', () => {
        // Act
        game.randomCubeHandful(new Map([
            ['red', 5],
            ['green', 2],
            ['blue', 6]
        ]));

        // Act
        game.randomCubeHandful(new Map([
            ['red', 2],
            ['green', 1],
            ['blue', 9]
        ]));

        // Assert
        expect(game.acquireMaxColorCubes()).toEqual(new Map([
            ['red', 5],
            ['green', 2],
            ['blue', 9]
        ]));
    });

    it('will increase the maximum cube count for one color when handful contains one color that is higher', () => {
        // Act
        game.randomCubeHandful(new Map([
            ['red', 5],
            ['green', 2],
            ['blue', 6]
        ]));
        game.randomCubeHandful(new Map([
            ['red', 8]
        ]));

        // Assert
        expect(game.acquireMaxColorCubes()).toEqual(new Map([
            ['red', 8],
            ['green', 2],
            ['blue', 6]
        ]));
    });

    it('will not increase the maximum cube count for one color when handful contains one color that is lower', () => {
        // Act
        game.randomCubeHandful(new Map([
            ['red', 5],
            ['green', 2],
            ['blue', 6]
        ]));
        game.randomCubeHandful(new Map([
            ['red', 3]
        ]));

        // Assert
        expect(game.acquireMaxColorCubes()).toEqual(new Map([
            ['red', 5],
            ['green', 2],
            ['blue', 6]
        ]));
    });

});