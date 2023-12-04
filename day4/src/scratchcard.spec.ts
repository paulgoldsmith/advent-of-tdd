import { sumScratchcardWins } from "./scratchcard.js";

describe('the scratchcards points sum', () => {

    describe('incorrect input data', () => {
        it('cannot sum points for scratchcards input of empty string', () => {
            // Act / Assert
            expect(() => sumScratchcardWins('')).toThrow();
        });
        
        it('cannot sum points for scratchcards input of null', () => {
            // Act / Assert
            expect(() => sumScratchcardWins(null)).toThrow();
        });
        
        it('cannot sum points for scratchcards input of undefined', () => {
            // Act / Assert
            expect(() => sumScratchcardWins(undefined)).toThrow();
        });
    
        it('cannot sum points for scratchcards input that is completely incorrectly formatted', () => {
            // Act / Assert
            expect(() => sumScratchcardWins('Not expected format')).toThrow();
        });
    
        it('cannot sum points for scratchcards input that has an incorrectly formatted Card number', () => {
            // Act / Assert
            expect(() => sumScratchcardWins('Card XXX: 1 2 3 4 5 | 1 2 3 4 5 6 7 8')).toThrow();
        });
    
        it('cannot sum points for scratchcards input that has an incorrectly formatted scratch numbers before pipe', () => {
            // Act / Assert
            expect(() => sumScratchcardWins('Card 1: X 2 3 4 5 | 1 2 3 4 5 6 7 8')).toThrow();
        });
    
        it('cannot sum points for scratchcards input that has an incorrectly formatted scratch numbers after pipe', () => {
            // Act / Assert
            expect(() => sumScratchcardWins('Card 1: 1 2 3 4 5 | X 2 3 4 5 6 7 8')).toThrow();
        });
    
        it('cannot sum points for scratchcards input that has an incorrectly formatted scratch numbers delimiter', () => {
            // Act / Assert
            expect(() => sumScratchcardWins('Card 1: 1 2 3 4 5 , 1 2 3 4 5 6 7 8')).toThrow();
        });    
    });

    describe('correct input data for points', () => {
        it('can sum points for one scratchcard that has an arbitrary number of spaces between numbers and Card identifiers', () => {
            // Act
            const sum = sumScratchcardWins('Card   1:  1  2 3 4 5 |  1  2  3   5   6  7 8');

            // Assert
            expect(sum).toEqual(8);
        });

        it('can sum points for one scratchcard that matches some numbers for any number of my numbers and lottery numbers', () => {
            // Act
            const sum = sumScratchcardWins('Card 1:  1  2 3 4 5 6 7 8 9 10 15 20 |  1  2 23 24 25 26 27 28 30 40');

            // Assert
            expect(sum).toEqual(2);
        });

        it('can sum points for one scratchcard that matches all numbers for padded two digits', () => {
            // Act
            const sum = sumScratchcardWins('Card 1:  1  2 23 24 25 |  1  2 23 24 25 26 27 28');

            // Assert
            expect(sum).toEqual(16);
        });

        it('can sum points for one scratchcard that matches all numbers', () => {
            // Act
            const sum = sumScratchcardWins('Card 1: 1 2 3 4 5 | 1 2 3 4 5 6 7 8');

            // Assert
            expect(sum).toEqual(16);
        });

        it('can sum points for one scratchcard that matches no numbers', () => {
            // Act
            const sum = sumScratchcardWins('Card 1: 1 2 3 4 5 | 21 22 23 24 25 26 27 28');

            // Assert
            expect(sum).toEqual(0);
        });

        it('can sum points for one scratchcard that matches some numbers', () => {
            // Act
            const sum = sumScratchcardWins('Card 1: 1 2 3 4 5 | 21 22 23 4 5 6 7 8');

            // Assert
            expect(sum).toEqual(2);
        });

        it('can sum points for multiple scratchcards from example', () => {
            // Act
            const sum = sumScratchcardWins(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 1`);

            // Assert
            expect(sum).toEqual(13);
        });
    });

    describe('correct input data for extra cards', () => {
        it('can sum points for one scratchcard that matches no numbers', () => {
            // Act
            const sum = sumScratchcardWins('Card 1: 1 2 3 4 5 | 21 22 23 24 25 26 27 28', true);

            // Assert
            expect(sum).toEqual(1);
        });

        it('can sum points for one scratchcard that matches some numbers (since we cannot go off the end of the card list)', () => {
            // Act
            const sum = sumScratchcardWins('Card 1: 1 2 3 4 5 | 21 22 23 4 5 6 7 8', true);

            // Assert
            expect(sum).toEqual(1);
        });

        it('can sum points for one scratchcard that matches all numbers (since we cannot go off the end of the card list)', () => {
            // Act
            const sum = sumScratchcardWins('Card 1: 1 2 3 4 5 | 1 2 3 4 5 6 7 8', true);

            // Assert
            expect(sum).toEqual(1);
        });

        it('can sum points for multiple scratchcards from example', () => {
            // Act
            const sum = sumScratchcardWins(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`, true);

            // Assert
            expect(sum).toEqual(30);
        });
    });
});