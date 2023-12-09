import { seedClosestLocation } from "./seed-location-mapper.js";

describe('the seed to closest location function', () => {
    describe('malformed input', () => {
        it('cannot accept an undefined input', () => {
            // Assert
            expect(() => seedClosestLocation(undefined)).toThrow();
        });
    
        it('cannot accept an empty input', () => {
            // Assert
            expect(() => seedClosestLocation('')).toThrow();
        });
    
        it('cannot accept a malformed input', () => {
            // Assert
            expect(() => seedClosestLocation('this is not a valid map')).toThrow();
        });

        it('cannot accept negative seeds', () => {
            // Assert
            expect(seedClosestLocation(`seeds: -1
    
seed-to-soil map:
1 1 1

soil-to-fertilizer map:
1 1 1

fertilizer-to-water map:
1 1 1

water-to-light map:
1 1 1

light-to-temperature map:
1 1 1

temperature-to-humidity map:
1 1 1

humidity-to-location map:
1 1 1`)).toThrow();
        });

        it('cannot accept negative locations', () => {
            // Assert
            expect(seedClosestLocation(`seeds: 1
    
seed-to-soil map:
-1 1 1

soil-to-fertilizer map:
1 1 1

fertilizer-to-water map:
1 1 1

water-to-light map:
1 1 1

light-to-temperature map:
1 1 1

temperature-to-humidity map:
1 1 1

humidity-to-location map:
1 1 1`)).toThrow();
        });    
    });

    describe('correctly formed input', () => {
        it('can path a map for a single lowest numbered seed where the path matches the number all the way through', () => {
            // Assert
            expect(seedClosestLocation(`seeds: 1
    
seed-to-soil map:
1 1 1

soil-to-fertilizer map:
1 1 1

fertilizer-to-water map:
1 1 1

water-to-light map:
1 1 1

light-to-temperature map:
1 1 1

temperature-to-humidity map:
1 1 1

humidity-to-location map:
1 1 1`)).toEqual(1);
        });
    
        it('can path a map for a single lowest numbered seed where the path does not match the number all the way through', () => {
            // Assert
            expect(seedClosestLocation(`seeds: 1
    
seed-to-soil map:
2 1 1

soil-to-fertilizer map:
1 2 1

fertilizer-to-water map:
1 1 1

water-to-light map:
1 1 1

light-to-temperature map:
1 1 1

temperature-to-humidity map:
1 1 1

humidity-to-location map:
1 1 1`)).toEqual(1);
        });

        it('can path a map for the example input', () => {
            // Assert
            expect(seedClosestLocation(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`)).toEqual(35);
        });    
    });
});