import { sumScratchcardWins } from "./scratchcard.js";

describe('the scratchcards points sum', () => {

    it('can sum points for scratchcards input of empty string', () => {
        // Act
        const sum = sumScratchcardWins('');

        // Assert
        expect(sum).toEqual(0);
    });

});