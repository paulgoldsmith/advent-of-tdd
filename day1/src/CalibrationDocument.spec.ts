import { CalibrationDocument } from "./CalibrationDocument.js";

describe('the calibration document', () => {
    it('can be created empty', () => {
        // Arrange / Act
        const calibrationDocument = new CalibrationDocument();

        // Assert
        expect(calibrationDocument).toBeDefined();
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
});