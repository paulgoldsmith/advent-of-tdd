const Colors = ['red', 'green', 'blue'];
export type CubeColors = 'red' | 'green' | 'blue';

export class Game {
    private maxCubeColors: Map<CubeColors, number> = new Map([['red', 0],['green', 0], ['blue', 0]]);

    public randomCubeHandful(colorMap: Map<CubeColors, number>): void {
        for (const color: CubeColors of Object.keys(Colors)) {
            const valueFromBag = colorMap.get(color);
            const maxCubeValue = this.maxCubeColors.get(color);
            if (colorMap[color] > this.maxCubeColors[color]) {
                this.maxCubeColors.set(colorMap.get(color];
            }
        }
    }

    public acquireMaxColorCubes(): Map<CubeColors, number> {
        return this.maxCubeColors;
    }
}