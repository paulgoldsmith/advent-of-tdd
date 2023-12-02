import { CubeColors } from "./CubeColors.js";
import { GameMatcher } from "./GameMatcher.js";

describe('the GameMatcher', () => {
    let gameMatcher: GameMatcher;
    beforeEach(() => {
        gameMatcher = new GameMatcher();
    });

    describe('the class', () => {
        it('can be created', () => {
            // Assert
            expect(gameMatcher).toBeDefined();
        });
    });

    describe('setting the maximum colors counts', () => {
        it('can set maximum counts of one color to be non-zero', () => {
            // Act
            gameMatcher.setMaximumColorCount(new Map<CubeColors, number>([
                ['red', 10]
            ]));
    
            // Assert
            expect(gameMatcher).toBeDefined();
        });

        it('can set maximum counts of all colors to be non-zero', () => {
            // Act
            gameMatcher.setMaximumColorCount(new Map<CubeColors, number>([
                ['red', 12],
                ['green', 13],
                ['blue', 14]
            ]));
    
            // Assert
            expect(gameMatcher).toBeDefined();
        });
    });

    describe('adding games from a line of text', () => {
        it('throws an error for a completely invalid input', () => {
            // Arrange
            const game = 'This is not of the expected form';

            // Act / Assert
            expect(() => gameMatcher.addGame(game)).toThrow();
        });

        it('throws an error for a game id that is not a number', () => {
            // Arrange
            const game = 'Game ZZZ: 3 blue';

            // Act / Assert
            expect(() => gameMatcher.addGame(game)).toThrow();
        });
       
        it('throws an error for a color value that is not number', () => {
            // Arrange
            const game = 'Game 12: XXX blue';

            // Act / Assert
            expect(() => gameMatcher.addGame(game)).toThrow();
        });

        it('throws an error for a color that is not valid', () => {
            // Arrange
            const game = 'Game 88: 4 purple';

            // Act / Assert
            expect(() => gameMatcher.addGame(game)).toThrow();
        });

        it('throws an error for an invalid color delimiter', () => {
            // Arrange
            const game = 'Game 88: 4 blue. 5 green';

            // Act / Assert
            expect(() => gameMatcher.addGame(game)).toThrow();
        });

        it('throws an error for an invalid handful delimiter', () => {
            // Arrange
            const game = 'Game 88: 4 blue, 5 green: 6 red';

            // Act / Assert
            expect(() => gameMatcher.addGame(game)).toThrow();
        });

        it('throws an error for an two counts of the same color in a single handful', () => {
            // Arrange
            const game = 'Game 88: 4 blue, 5 green, 10 blue';

            // Act / Assert
            expect(() => gameMatcher.addGame(game)).toThrow();
        });
        
        it('can add one new game with single color pulled from bag', () => {
            // Arrange
            const game = 'Game 31: 9 blue';

            // Act
            gameMatcher.addGame(game);

            // Assert
            expect(gameMatcher).toBeDefined();
        });

        it('can add one new game with multiple colors pulled from bag with a 3 digit game id', () => {
            // Arrange
            const game = 'Game 282: 3 blue, 5 green';

            // Act
            gameMatcher.addGame(game);

            // Assert
            expect(gameMatcher).toBeDefined();
        });

        
        it('can add one new game with multiple handfulls of colors pulled from bag', () => {
            // Arrange
            const game = 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue';

            // Act
            gameMatcher.addGame(game);

            // Assert
            expect(gameMatcher).toBeDefined();
        });
    });

    describe('getting the sum of game ids that are possible', () => {
        beforeEach(() => {
            gameMatcher.setMaximumColorCount(new Map([
                ['red', 12],
                ['green', 13],
                ['blue', 14]
            ]));
        });

        it('can sum with no games added', () => {
            // Assert
            expect(gameMatcher.sumPossible()).toEqual(0);
        });

        it('can sum with one game added that is possible', () => {
            // Arrange
            const game = 'Game 282: 3 blue, 5 green';
            gameMatcher.addGame(game);
            // Assert
            expect(gameMatcher.sumPossible()).toEqual(282);
        });

        it('can sum with one game added that is not possible', () => {
            // Arrange
            const game = 'Game 282: 53 blue, 55 green';
            gameMatcher.addGame(game);
            // Assert
            expect(gameMatcher.sumPossible()).toEqual(0);
        });

        it('can sum with one game added that is possible and one that is not possible', () => {
            // Arrange
            const game1 = 'Game 42: 3 blue, 5 green';
            const game2 = 'Game 82: 53 blue, 55 green';
            gameMatcher.addGame(game1);
            gameMatcher.addGame(game2);

            // Assert
            expect(gameMatcher.sumPossible()).toEqual(42);
        });

        it('can sum with many games added that are possible and not possible', () => {
            // Arrange
            const game1 = 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green';
            const game2 = 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue';
            const game3 = 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red';
            const game4 = 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red';
            const game5 = 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green';
            gameMatcher.addGame(game1);
            gameMatcher.addGame(game2);
            gameMatcher.addGame(game3);
            gameMatcher.addGame(game4);
            gameMatcher.addGame(game5);
            
            // Assert
            expect(gameMatcher.sumPossible()).toEqual(8);
        });
    });
});