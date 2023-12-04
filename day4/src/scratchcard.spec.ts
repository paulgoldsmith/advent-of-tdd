import { sumScratchcardWins } from "./scratchcard.js";

describe('the scratchcards points sum', () => {

    it('can be sum points for scratchcards empty string', () => {
        // Act
        const sum = sumScratchcardWins('');

        // Assert
        expect(sum).toEqual(0);
    });

});