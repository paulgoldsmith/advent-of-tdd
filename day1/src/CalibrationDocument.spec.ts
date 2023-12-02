import { CalibrationDocument } from "./CalibrationDocument.js";

describe('the calibration document', () => {
    it('can be created empty', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();

        // Assert
        expect(calibrationDocument).toBeDefined();
        expect(calibrationDocument.sum()).toEqual(0);
    });

    it('can be created with one line being null', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine(null);

        // Assert
        expect(calibrationDocument.sum()).toEqual(0);
    });

    it('can be created with one line being undefined', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine(undefined);

        // Assert
        expect(calibrationDocument.sum()).toEqual(0);
    });

    it('can be created with one line being empty', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('');

        // Assert
        expect(calibrationDocument.sum()).toEqual(0);
    });

    it('can be created with one line containing only alphabetic characters', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('abs');

        // Assert
        expect(calibrationDocument.sum()).toEqual(0);
    });

    it('can be created with one line containing only special characters', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('!@#%');

        // Assert
        expect(calibrationDocument.sum()).toEqual(0);
    });
    
    it('can be created with one line containing only numbers', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('12');

        // Assert
        expect(calibrationDocument.sum()).toEqual(12);
    });

    it('can be created with one line containing numbers and letters with numbers first and last', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('2abc3');

        // Assert
        expect(calibrationDocument.sum()).toEqual(23);
    });

    it('can be created with one line containing numbers and letters with numbers in the middle', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('a4b6c');

        // Assert
        expect(calibrationDocument.sum()).toEqual(46);
    });

    it('can be created with one line containing numbers and letters with a single number', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('a5bc');

        // Assert
        expect(calibrationDocument.sum()).toEqual(55);
    });

    it('can be created with one line containing numbers and letters with numbers at the end', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('abc78');

        // Assert
        expect(calibrationDocument.sum()).toEqual(78);
    });

    it('can be created with multiple lines containing numbers and letters', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('1abc2');
        calibrationDocument.addLine('pqr3stu8vwx');
        calibrationDocument.addLine('a1b2c3d4e5f');
        calibrationDocument.addLine('treb7uchet');

        // Assert
        expect(calibrationDocument.sum()).toEqual(142);
    });

    it('can be created with one line containing a word number', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('one');

        // Assert
        expect(calibrationDocument.sum()).toEqual(11);
    });

    it('can be created with one line containing two word numbers', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('twothree');

        // Assert
        expect(calibrationDocument.sum()).toEqual(23);
    });

    it('can be created with one line containing two word numbers and other letters in between', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('fourssssfive');

        // Assert
        expect(calibrationDocument.sum()).toEqual(45);
    });

    it('can be created with one line containing two word numbers and other letters before and after', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('abcsixsevendef');

        // Assert
        expect(calibrationDocument.sum()).toEqual(67);
    });

    it('can be created with one line containing two word numbers and other letters before, after and in between', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('abceightdefninehij');

        // Assert
        expect(calibrationDocument.sum()).toEqual(89);
    });

    it('can be created with one line containing a word number first and digit number last and other numbers and letters before and after', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('rrrtwossssninexxx4zzz');

        // Assert
        expect(calibrationDocument.sum()).toEqual(24);
    });

    it('can be created with multiple lines containing a word and digit numbers', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();
        calibrationDocument.addLine('two1nine');
        calibrationDocument.addLine('eightwothree');
        calibrationDocument.addLine('abcone2threexyz');
        calibrationDocument.addLine('xtwone3four');
        calibrationDocument.addLine('4nineeightseven2');
        calibrationDocument.addLine('zoneight234');
        calibrationDocument.addLine('7pqrstsixteen');

        // Assert
        expect(calibrationDocument.sum()).toEqual(24);
    });
});