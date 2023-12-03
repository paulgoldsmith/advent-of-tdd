type IsAdjacent = {multiplyCoordinates: number[] | undefined, isAdjacent: boolean};
type WholeNumber = {value: number, excludeCoordinates: number[][], numberLength: number};
export class EngineSchematic {
    private schematic: string[];
    private readonly ACCEPTED_CHARACTERS = /^[\n\d/@#$%&*\-+=.]*$/g;
    private readonly ENGINE_SYMBOLS = '/-@#$%&*+=';

    private parseSchematicInput(schematicInput: string): string[] {
        if (!schematicInput.match(this.ACCEPTED_CHARACTERS)) {
            throw 'Unexpected input format';
        }
        const splitSchematic = schematicInput.split('\n');
        const expectedSchematicLength = splitSchematic ? splitSchematic[0].length : 0;
        for (const line of splitSchematic) {
            if (line.length !== expectedSchematicLength) {
                throw 'Schematic shape is irregular';
            }
        }
        return splitSchematic;
    }

    constructor(schematicInput: string) {
        this.schematic = this.parseSchematicInput(schematicInput);
    }

    private isNumberAdjacentToSymbols(lineNumber: number, characterNumber: number, numberLength: number): IsAdjacent {
        const beforeLocation = characterNumber - 1;
        const afterLocation = characterNumber + numberLength;
        for (let i = lineNumber - 1; i <= lineNumber + 1 && i < this.schematic.length; i++) {
            if (i >= 0) {
                for (let j = beforeLocation; j <= afterLocation && j < this.schematic[i].length; j++) {
                    if (j >= 0 && this.ENGINE_SYMBOLS.includes(this.schematic[i][j])) {
                        if (this.schematic[i][j] === '*') {
                            return {multiplyCoordinates:[i, j], isAdjacent:true};
                        }
                        return {multiplyCoordinates:undefined, isAdjacent:true};
                    }
                }
            }
        }
        return {multiplyCoordinates:undefined, isAdjacent:false};
    }

    private identifyWholeNumber(lineNumber: number, characterNumber: number): WholeNumber {
        const line = this.schematic[lineNumber];
        let startOfNumber = characterNumber;
        for (let i = startOfNumber; i >= 0; i--) {
            const parsedInt = parseInt(line[i]);
            if (isNaN(parsedInt)) {
                startOfNumber = i + 1;
                break;
            }
            if (i === 0) {
                startOfNumber = 0;
            }
        }
        const charactersFromCurrentLocation = line.substring(startOfNumber);
        const currentNumberString = charactersFromCurrentLocation.match(/^(\d+)/)[1];
        const numberLength = currentNumberString.length;
        const value = parseInt(currentNumberString);
        const excludeCoordinates = [];
        for (let i = startOfNumber; i <= startOfNumber + numberLength; i++) {
            excludeCoordinates.push([lineNumber, i]);
        }
        return {value, excludeCoordinates, numberLength};
    }

    private findAdjacentNumber(multiplyCoordinate: number[], excludeCoordinates: number[][]): WholeNumber {
        const lineNumber = multiplyCoordinate[0];
        const characterNumber = multiplyCoordinate[1];
        const beforeLocation = characterNumber - 1;
        const afterLocation = characterNumber + 1;
        for (let i = lineNumber - 1; i <= lineNumber + 1 && i < this.schematic.length; i++) {
            if (i >= 0) {
                for (let j = beforeLocation; j <= afterLocation && j < this.schematic[i].length; j++) {
                    if (excludeCoordinates.some(location => location[0] === i && location[1] === j)) {
                        continue;
                    }
                    const currentLocationAsNumber = parseInt(this.schematic[i][j]);
                    if (!isNaN(currentLocationAsNumber)) {
                        return this.identifyWholeNumber(i, j);
                    }
                }
            }
        }
        return undefined;
    }

    public sum(withGears: boolean = false): number {
        let sum = 0;
        let ignoreCharacterLocations = [];

        this.schematic.forEach((line: string, lineNumber: number) => {
            line.split('').forEach((character: string, characterNumber: number) => {
                if (ignoreCharacterLocations.some(location => location[0] === lineNumber && location[1] === characterNumber)) {
                    return;
                }
                const parsedInt = parseInt(character);
                if (!isNaN(parsedInt)) {
                    const {excludeCoordinates, value: currentNumber, numberLength} = this.identifyWholeNumber(lineNumber, characterNumber);
                    ignoreCharacterLocations = ignoreCharacterLocations.concat(excludeCoordinates);
                    const adjacentToSymbols = this.isNumberAdjacentToSymbols(lineNumber, characterNumber, numberLength);
                    if (adjacentToSymbols.isAdjacent) {
                        if (withGears) {
                            if (adjacentToSymbols.multiplyCoordinates !== undefined) {
                                const adjacentNumber = this.findAdjacentNumber(adjacentToSymbols.multiplyCoordinates, ignoreCharacterLocations);
                                if (adjacentNumber !== undefined) {
                                    sum += (currentNumber * adjacentNumber.value);
                                    ignoreCharacterLocations = ignoreCharacterLocations.concat(adjacentNumber.excludeCoordinates);
                                }
                            }
                        } else {
                            sum += currentNumber;
                        }
                    }
                }
            });
        });
        return sum;
    }
}