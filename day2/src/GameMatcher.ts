import { CubeColors } from "./CubeColors.js";
import { Game } from "./Game.js";

export class GameMatcher {
    constructor(private maxColorCounts: Map<CubeColors, number>, private games: Game[] = []) {

    }

    private parseGameInput(gameInput: string): Game {
        const prefixMatch = gameInput.match(/^Game (\d+):([\sa-z\d;,]+)$/);
        if (!prefixMatch) {
            throw 'Game prefix did not match the expected format';
        }
        const [_, gameId, handfulsInput] = prefixMatch;
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
                const matchCube = cubes.match(/^\s(\d+)\s(red|green|blue)$/);
                if (!matchCube) {
                    throw 'Unexpected format for color cube set';
                }
                const [_, count, color] = matchCube;
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
        this.games.push(this.parseGameInput(gameInput));
    }

    public sumPossible(): number {
        this.maxColorCounts;
        return 0;
    }
}