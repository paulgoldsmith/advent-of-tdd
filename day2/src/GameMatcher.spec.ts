import { CubeColors } from "./CubeColors.js";
import { GameMatcher } from "./GameMatcher.js";

describe('the GameMatcher', () => {
    let gameMatcher: GameMatcher;
    beforeEach(() => {
        gameMatcher = new GameMatcher();
    });

    it('can be created', () => {
        // Assert
        expect(gameMatcher).toBeDefined();
    });

    it('can set maximum counts of colors', () => {
        // Act
        gameMatcher.setMaximumColorCount(new Map<CubeColors, number>([
            ['red', 14],
            ['green', 14],
            ['blue', 14]
        ]));

        // Assert
        expect(gameMatcher).toBeDefined();
    });

    it('can add one new game with single color pulled from bag', () => {
        // Arrange
        const game = 'Game 1: 3 blue';

        // Act
        gameMatcher.addGame(game);

        // Assert
        expect(gameMatcher).toBeDefined();
    });

    it('can add one new game with multiple colors pulled from bag', () => {
        // Arrange
        const game = 'Game 1: 3 blue, 5 green'

        // Act
        gameMatcher.addGame(game);

        // Assert
        expect(gameMatcher).toBeDefined();
    });

    
    it('can add one new game with multiple handfulls of colors pulled from bag', () => {
        // Arrange
        const game = 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'

        // Act
        gameMatcher.addGame(game);

        // Assert
        expect(gameMatcher).toBeDefined();
    });
});