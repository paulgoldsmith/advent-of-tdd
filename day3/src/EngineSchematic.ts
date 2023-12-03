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

    private isNumberAdjacentToSymbols(lineNumber: number, characterNumber: number, numberLength: number): boolean {
        const beforeLocation = characterNumber - 1;
        const afterLocation = characterNumber + numberLength;
        for (let i = lineNumber - 1; i <= lineNumber + 1 && i < this.schematic.length; i++) {
            if (i >= 0) {
                for (let j = beforeLocation; j <= afterLocation && j < this.schematic[i].length; j++) {
                    if (j >= 0 && this.ENGINE_SYMBOLS.includes(this.schematic[i][j])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public sum(): number {
        let sum = 0;
        this.schematic.forEach((line: string, lineNumber: number) => {
            let ignoreNextCharacterSpaces = 0;
            line.split('').forEach((character: string, characterNumber: number) => {
                if (ignoreNextCharacterSpaces > 0) {
                    ignoreNextCharacterSpaces--;
                    return;
                }
                const parsedInt = parseInt(character);
                if (!isNaN(parsedInt)) {
                    const charactersFromCurrentLocation = line.substring(characterNumber);
                    const currentNumber = charactersFromCurrentLocation.match(/^(\d+)/)[1];
                    const numberLength = currentNumber.length;
                    ignoreNextCharacterSpaces = numberLength;
                    if (this.isNumberAdjacentToSymbols(lineNumber, characterNumber, numberLength)) {
                        sum += parseInt(currentNumber);
                    }
                }
            });
        });
        return sum;
    }
}