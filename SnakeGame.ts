import {Grid} from "./Grid";
import {SnakeGameController} from "./SnakeGameController";
import {Snake} from "./Snake";

export type Point = {
    readonly x: number;
    readonly y: number;
}

export enum Direction {
    UP = 1,
    DOWN = 2,
    RIGHT = 3,
    LEFT = 4
}

export class SnakeGame {
    config: any;

    constructor(config: any) {
        this.config = config;

        console.log("test!");

        this.initGame();
    }

    private initGame(): void {
        let grid = new Grid (
            this.config.game.mainElementId,
            { x: this.config.grid.size.x, y: this.config.grid.size.y },
            this.config.grid.sizePerPixel
        );
        let minDistance: number = Math.ceil(this.config.grid.size.x * this.config.grid.size.y / 500);
        let startDirection: Direction = Direction[Direction[(Math.ceil(Math.random() * 4))]];
        let randomPoint = this.createRandomPoint();
        let snakeTailStart = {
            x: randomPoint.x > minDistance ? randomPoint.x : minDistance,
            y: randomPoint.y > minDistance ? randomPoint.y : minDistance
        };

        switch (startDirection) {
            case Direction.UP: snakeTailStart.x = 1; break;
            case Direction.DOWN: snakeTailStart.y = this.config.grid.size.y; break;
            case Direction.LEFT: snakeTailStart.x = this.config.grid.size.x; break;
            case Direction.RIGHT: snakeTailStart.y = 1; break;
        }

        let snake = new Snake(this.config.game.initSnakeLength, grid);
        SnakeGameController.create(grid, snakeTailStart, startDirection, snake, this.config.game.speed);
        document.getElementById("startSnake").addEventListener("click", SnakeGameController.startGame);
    }

    private createRandomPoint() {
        return {
            x: Math.floor(Math.random() * this.config.grid.size.x) + 1,
            y: Math.floor(Math.random() * this.config.grid.size.y) + 1
        }
    }
}
