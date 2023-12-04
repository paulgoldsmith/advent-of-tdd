const CARD_FORMAT = /^Card\s+\d+:([\s\d]+)\|([\s\d]+)$/;
export function sumScratchcardWins(scratchcards: string): number {
    return scratchcards.split('\n').reduce((prev, curr) => {
        const cardMatch = curr.match(CARD_FORMAT);
        if (!cardMatch) {
            throw `Unexpected format for scratchcard with content containing [${curr}]`;
        }
        const [myNumbersInput, lotteryNumbersInput] = cardMatch.splice(1);
        const myNumbers = myNumbersInput
            .split(' ')
            .filter(value => value.trim().length > 0)
            .map(value => parseInt(value.trim()));
        const lotteryNumbers = lotteryNumbersInput
            .split(' ')
            .filter(value => value.trim().length > 0)
            .map(value => parseInt(value.trim()));
        const pointsForCard = (2 ** (myNumbers.filter(number => lotteryNumbers.includes(number)).length)) >> 1;
        return prev + pointsForCard;
    }, 0);
}