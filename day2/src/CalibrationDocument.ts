export class CalibrationDocument {
    private forwardNumberWords = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine'
    ];
    private backwardNumberWords = this.forwardNumberWords.map(number => number.split('').reverse().join(''));

    private calculatedSum: number;

    constructor() {
        this.calculatedSum = 0;
    }

    public sum(): number {
        return this.calculatedSum;
    }

    private findFirstNumber(line: string, numberWords: string[]): string {
        if (line.length < 1) {
            return '';
        }
        if (line[0].match(/\d/)) {
            return line[0];
        }
        const index = numberWords.findIndex((numberWord) => line.match(`^${numberWord}`));
        if (index > -1) {
            return `${index + 1}`;
        }
        return this.findFirstNumber(line.substring(1), numberWords);
    }

    private parse(line: string): number {
        const firstNumber = this.findFirstNumber(line, this.forwardNumberWords);
        if (!firstNumber) {
            return 0;
        }
        const secondNumber = this.findFirstNumber(line.split('').reverse().join(''), this.backwardNumberWords) || firstNumber;
        return parseInt(`${firstNumber}${secondNumber}`);
    }

    public addLine(line: string): void {
        line = line || '';
        this.calculatedSum += this.parse(line);
    }

}