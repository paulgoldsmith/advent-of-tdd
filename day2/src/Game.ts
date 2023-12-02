enum CubeColorValues { 'red', 'green', 'blue' };
export type CubeColors = keyof typeof CubeColorValues;
export class Game {
    private maxCubeColors: Map<CubeColors, number> = new Map([
        ['red', 0],
        ['green', 0],
        ['blue', 0]]
    );

    public randomCubeHandful(colorMap: Map<CubeColors, number>): void {
        for (const color of Object.keys(CubeColorValues) as CubeColors[]) {
            const valueFromBag = colorMap.get(color);
            const maxCubeValue = this.maxCubeColors.get(color);
            if (valueFromBag > maxCubeValue) {
                this.maxCubeColors.set(color, valueFromBag);
            }
        }
    }

    public acquireMaxColorCubes(): Map<CubeColors, number> {
        return this.maxCubeColors;
    }
}