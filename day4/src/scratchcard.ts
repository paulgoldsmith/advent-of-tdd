const CARD_FORMAT = /^Card\s+\d+:([\s\d]+)\|([\s\d]+)$/;
export function sumScratchcardWins(scratchcards: string, extraCards: boolean = false): number {
    return scratchcards.split('\n').reduce((prev, curr) => {
        const cardMatch = curr.match(CARD_FORMAT);
        if (!cardMatch) {
            throw `Unexpected format for scratchcard with content containing [${curr}]`;
        }
        const [myNumbersInput, lotteryNumbersInput] = cardMatch.slice(1);
        const myNumbers = myNumbersInput
            .split(' ')
            .filter(value => value.trim().length > 0)
            .map(value => parseInt(value.trim()));
        const lotteryNumbers = lotteryNumbersInput
            .split(' ')
            .filter(value => value.trim().length > 0)
            .map(value => parseInt(value.trim()));
        const numberOfMatches = myNumbers.filter(number => lotteryNumbers.includes(number)).length;
        if (!extraCards) {
            const pointsForCard = (2 ** (numberOfMatches)) >> 1;
            return {sum: prev.sum + pointsForCard, duplicateCards: undefined};    
        } else {
            const numberOfWins = Array(numberOfMatches).fill(prev.duplicateCards[0]);
            return {
                sum: prev.sum + prev.duplicateCards[0],
                duplicateCards: prev.duplicateCards.slice(1).map((value, index) => numberOfWins[index] ? value + numberOfWins[index] : value)
            };
        }
    }, {sum: 0, duplicateCards:Array(scratchcards.split('\n').length).fill(1)}).sum;
}