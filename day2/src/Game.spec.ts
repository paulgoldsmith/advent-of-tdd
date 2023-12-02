import { Game } from "./Game.js";

describe('the game', () => {
    let game;
    beforeEach(() => {
        game = new Game();
    });

    it('can be created', () => {
        // Assert
        expect(game).toBeDefined();
    });

    it('will have all color maximums to 0 with no cube grabs', () => {
        // Assert
        expect(game.acquireMaxCubes()).toBe({
            'red': 0,
            'blue': 0,
            'green': 0
        });
    });

    it('will increase the maximum cube count for each color for one handful', () => {
        // Act
        game.randomCubeHandful({
            'red': 1,
            'green': 2,
            'blue': 6
        });

        // Assert
        expect(game.acquireMaxCubes()).toBe({
            'red': 1,
            'green': 2,
            'blue': 6
        });
    });

    it('will increase the maximum cube count for only red color cubes for two handfuls', () => {
        // Act
        game.randomCubeHandful({
            'red': 5,
            'green': 2,
            'blue': 6
        });

        // Act
        game.randomCubeHandful({
            'red': 8,
            'green': 1,
            'blue': 2
        });

        // Assert
        expect(game.acquireMaxCubes()).toBe({
            'red': 8,
            'green': 2,
            'blue': 6
        });
    });

    it('will increase the maximum cube count for only green color cubes for two handfuls', () => {
        // Act
        game.randomCubeHandful({
            'red': 5,
            'green': 2,
            'blue': 6
        });

        // Act
        game.randomCubeHandful({
            'red': 2,
            'green': 6,
            'blue': 2
        });

        // Assert
        expect(game.acquireMaxCubes()).toBe({
            'red': 5,
            'green': 6,
            'blue': 6
        });
    });

    it('will increase the maximum cube count for only blue color cubes for two handfuls', () => {
        // Act
        game.randomCubeHandful({
            'red': 5,
            'green': 2,
            'blue': 6
        });

        // Act
        game.randomCubeHandful({
            'red': 2,
            'green': 1,
            'blue': 9
        });

        // Assert
        expect(game.acquireMaxCubes()).toBe({
            'red': 5,
            'green': 2,
            'blue': 9
        });
    });

    it('will increase the maximum cube count for one color when handful contains one color that is higher', () => {
        // Act
        game.randomCubeHandful({
            'red': 5,
            'green': 2,
            'blue': 6
        });
        game.randomCubeHandful({
            'red': 8,
        });

        // Assert
        expect(game.acquireMaxCubes()).toBe({
            'red': 8,
            'blue': 2,
            'green': 6
        });
    });

    it('will not increase the maximum cube count for one color when handful contains one color that is lower', () => {
        // Act
        game.randomCubeHandful({
            'red': 5,
            'green': 2,
            'blue': 6
        });
        game.randomCubeHandful({
            'red': 3,
        });

        // Assert
        expect(game.acquireMaxCubes()).toBe({
            'red': 5,
            'blue': 2,
            'green': 6
        });
    });

});