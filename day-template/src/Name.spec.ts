import { Name } from "./Name.js";

describe('the calibration document', () => {
    let name;
    beforeEach(() => {
        name = new Name();
    });

    it('can be created empty', () => {
        // Assert
        expect(name).toBeDefined();
    });

});