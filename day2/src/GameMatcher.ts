import { CubeColorValues, CubeColors } from "./CubeColors.js";
import { Game } from "./Game.js";

export class GameMatcher {
    constructor(private maxColorCounts: Map<CubeColors, number>, private games: Game[] = []) {

    }

    private parseGameInput(gameInput: string): Game {
        const [prefixMatch, gameId, handfulsInput] = gameInput.match(/^Game (\d+):([\sa-z\d;,]+)$/);
        if (!prefixMatch) {
            throw 'Game prefix did not match the expected format';
        }
        const game = new Game(parseInt(gameId));
        const handfuls = handfulsInput.split(';');
        if (handfuls.length < 1) {
            throw 'Expected one or more handful of cubes per game';
        }
        for (const handful of handfuls) {
            const cubeSets = handful.split(',');
            if (cubeSets.length < 1) {
                throw 'Expected one or more sets of cubes per handful';
            }
            const randomCubeHandful = new Map<CubeColors, number>();
            for (const cubes of cubeSets) {
                const  [matchCube, count, color] = cubes.match(/^\s(\d+)\s(red|green|blue)$/);
                if (!matchCube) {
                    throw 'Unexpected format for color cube set';
                }
                if (randomCubeHandful.has(color as CubeColors)) {
                    throw 'Cannot have the same color twice in a single handful';
                }
                randomCubeHandful.set(color as CubeColors, parseInt(count));
            }
            game.randomCubeHandful(randomCubeHandful);
        }
        return game;
    }

    public addGame(gameInput: string): void {
        const game = this.parseGameInput(gameInput);
        const gameMaxColorCubes = game.acquireMaxColorCubes();
        for (const color of Object.keys(CubeColorValues) as CubeColors[]) {
            const gameMaxColorCube = gameMaxColorCubes.get(color);
            const maxColorCountCube = this.maxColorCounts.get(color);
            if (gameMaxColorCube > maxColorCountCube) {
                return;
            }
        }
        this.games.push(game);
    }

    public sumPossible(): number {
        let sum = 0;
        for (const game of this.games) {
            sum += game.gameId;
        }
        return sum;
    }
}