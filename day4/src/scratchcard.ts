const CARD_FORMAT = /^Card \d+:([\s\d]+)\|([\s\d]+)$/
const MY_NUMBERS = /^\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s$/;
const LOTTERY_NUMBERS = /^\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)$/;
export function sumScratchcardWins(scratchcards: string): number {
    return scratchcards.split('\n').reduce((prev, curr) => {
        if (!curr) {
            return prev;
        }
        const [matched, myNumbersInput, lotteryNumbersInput] = curr.match(CARD_FORMAT);
        if (!matched) {
            throw 'Unexpected format for scratchcards';
        }
        const myNumbersMatch = myNumbersInput.match(MY_NUMBERS);
        if (!myNumbersMatch) {
            throw 'Unexpected format for my numbers';
        }
        const myNumbers = myNumbersMatch.splice(1).map(value => parseInt(value.trim()));
        const lotteryNumbersMatch = lotteryNumbersInput.match(LOTTERY_NUMBERS);
        if (!lotteryNumbersMatch) {
            throw 'Unexpected format for lottery umbers';
        }
        const lotteryNumbers = lotteryNumbersMatch.splice(1).map(value => parseInt(value.trim()));
        const pointsForCard = (2 ** (myNumbers.filter(number => lotteryNumbers.includes(number)).length)) >> 1;
        return prev + pointsForCard;
    }, 0);
}