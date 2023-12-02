export class CalibrationDocument {
    private calculatedSum: number;

    constructor() {
        this.calculatedSum = 0;
    }

    public sum(): number {
        return this.calculatedSum;
    }

    private parse(line: string): number {
        const twoNumberMatch = line.match(/^[A-Za-z]*(\d)([A-Za-z\d]*)(\d)[A-Za-z]*$/);
        if (twoNumberMatch ) {
            return parseInt(`${twoNumberMatch[1]}${twoNumberMatch[3]}`);
        }
        const oneNumberMatch = line.match(/^[A-Za-z]*(\d)[A-Za-z]*$/);
        if (oneNumberMatch) {
            const singleNumber = parseInt(oneNumberMatch[1]);
            return parseInt(`${singleNumber}${singleNumber}`);
        }
        return 0;
    }

    public addLine(line: string): void {
        this.calculatedSum += this.parse(line);
    }

}