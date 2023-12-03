import { EngineSchematic } from "./EngineSchematic.js";

describe('the engine schematic', () => {

    it('can be created with an empty engine schematic', () => {
        //Act
        const engineSchematic = new EngineSchematic('');

        // Assert
        expect(engineSchematic).toBeDefined();
    });

    it('cannot be created with a string with invalid characters', () => {
        // Assert
        expect(() => new EngineSchematic('abc')).toThrow();
    });

    it('cannot be created with an irregular shape schematic', () => {

        // Assert
        expect(() => new EngineSchematic(`..123
..45
....*67`
        )).toThrow();
    });

    describe('1x1 array', () => {

        it('can be created with an empty position character', () => {
            //Act
            const engineSchematic = new EngineSchematic('.');

            // Assert
            expect(engineSchematic).toBeDefined();
        });

        it('can be created with a number', () => {
            //Act
            const engineSchematic = new EngineSchematic('3');

            // Assert
            expect(engineSchematic).toBeDefined();
        });

        it('can be created with a symbol', () => {
            //Act
            const engineSchematic = new EngineSchematic('&');

            // Assert
            expect(engineSchematic).toBeDefined();
        });

    });

    describe('2x2 arrays', () => {

        it('can be created with only empty position characters', () => {
            //Act
            const engineSchematic = new EngineSchematic(`..
..`);

            // Assert
            expect(engineSchematic).toBeDefined();
        });

        it('can be created with only numbers', () => {
            //Act
            const engineSchematic = new EngineSchematic(`32
45`);

            // Assert
            expect(engineSchematic).toBeDefined();
        });

        it('can be created with only symbols', () => {
            //Act
            const engineSchematic = new EngineSchematic(`=*
%#`);

            // Assert
            expect(engineSchematic).toBeDefined();
        });

        it('can be created with empty positions and number characters', () => {
            //Act
            const engineSchematic = new EngineSchematic(`.8
7.`);

            // Assert
            expect(engineSchematic).toBeDefined();
        });

        it('can be created with symbols and number characters', () => {
            //Act
            const engineSchematic = new EngineSchematic(`@8
7+`);

            // Assert
            expect(engineSchematic).toBeDefined();
        });

        it('can be created with empty positions and symbols', () => {
            //Act
            const engineSchematic = new EngineSchematic(`$.
7/`);

            // Assert
            expect(engineSchematic).toBeDefined();
        });

    });

    describe('3x3 arrays', () => {

        it('can be created with two digit numbers, symbols and empty position characters', () => {
            //Act
            const engineSchematic = new EngineSchematic(`32.
45-
...`);

            // Assert
            expect(engineSchematic).toBeDefined();
        });

        it('can be created with three digit numbers, symbols and empty position characters', () => {
            //Act
            const engineSchematic = new EngineSchematic(`456
%8#
...`);

            // Assert
            expect(engineSchematic).toBeDefined();
        });

    });

    describe('sum', () => {

        it('can generate a sum when two numbers are adjacent to a symbol', () => {
            //Arrange
            const engineSchematic = new EngineSchematic(`32.
45-
...`);
            //Act
            const sum = engineSchematic.sum();

            // Assert
            expect(sum).toEqual(77);
        });

        it('can generate a sum when no numbers are adjacent to a symbol', () => {
            //Arrange
            const engineSchematic = new EngineSchematic(`32.
45.
...`);
            //Act
            const sum = engineSchematic.sum();

            // Assert
            expect(sum).toEqual(0);
        });

        it('can generate a sum for the engine schematic example', () => {
            //Arrange
            const engineSchematic = new EngineSchematic(`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`);
            //Act
            const sum = engineSchematic.sum();

            // Assert
            expect(sum).toEqual(4361);
        });

        
        it('can generate a sum for a modified version of the engine schematic example', () => {
            //Arrange
            const engineSchematic = new EngineSchematic(`467..114..
...@......
..35...633
.......#..
617=......
.....+.58.
..592.....
......755.
...$./....
.664.598..`);
            //Act
            const sum = engineSchematic.sum();

            // Assert
            expect(sum).toEqual(4361);
        });
    });

});