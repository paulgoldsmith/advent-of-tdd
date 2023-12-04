const CARD_FORMAT = /^Card \d+:([\s\d]+)\|([\s\d]+)$/;
export function sumScratchcardWins(scratchcards: string): number {
    return scratchcards.split('\n').reduce((prev, curr) => {
        if (!curr) {
            return prev;
        }
        const [matched, myNumbersInput, lotteryNumbersInput] = curr.match(CARD_FORMAT);
        if (!matched) {
            throw 'Unexpected format for scratchcards';
        }
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