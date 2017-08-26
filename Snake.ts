import {Grid} from "./Grid";
import {Point} from "./SnakeGame";

export class Snake {
    snakePositions: Point[] = [];
    minLength: number;
    grid: Grid;

    constructor(initLength: number, grid: Grid) {
        this.minLength = initLength;
        this.grid = grid;
    }

    moveTo(point: Point, ate: boolean) {
        this.snakePositions.push(point);

        let bodyPixel = this.grid.getGridPixel(point);
        bodyPixel.setAsBodyPart();

        if(this.snakePositions.length > this.minLength && !ate) {
            let gridPixel = this.grid.getGridPixel(this.snakePositions.shift());
            gridPixel.setAsGridElement();
        }
    }
}
