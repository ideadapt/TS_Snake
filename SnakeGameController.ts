import {Grid} from "./Grid";
import {Direction, Point} from "./SnakeGame";
import {Snake} from "./Snake";

export class SnakeGameController {
    private static instance: SnakeGameController;

    grid: Grid;
    snake: Snake;
    speed: number;

    currentDirection: Direction;
    nextDirection: Direction;
    currentSnakeHead: Point;

    isDead: boolean = false;

    public static create(grid: Grid, start: Point, startDirection: Direction, snake: Snake, speed: number) {
        if(!SnakeGameController.instance) {
            SnakeGameController.instance = new SnakeGameController(grid, start, startDirection, snake, speed);
        }
        return SnakeGameController.instance;
    }

    public static getInstance(): SnakeGameController {
        return SnakeGameController.instance;
    }

    private constructor(grid: Grid, start: Point, startDirection: Direction, snake: Snake, speed: number) {
        this.grid = grid;
        this.snake = snake;
        this.speed = speed;
        this.currentSnakeHead = start;
        this.currentDirection = startDirection;
        this.nextDirection = startDirection;

        this.snake.moveTo(this.currentSnakeHead, false);

    }

    private keyboardInput(event: KeyboardEvent) {
        let controller = SnakeGameController.getInstance();

        // PRESS LEFT ARROW
        if (event.keyCode == 37 && controller.currentDirection != Direction.RIGHT) {
            controller.nextDirection = Direction.LEFT;
        }
        // PRESS UP ARROW
        else if (event.keyCode == 38 && controller.currentDirection != Direction.DOWN) {
            controller.nextDirection = Direction.UP;
        }
        // PRESS RIGHT ARROW
        else if (event.keyCode == 39 && controller.currentDirection != Direction.LEFT) {
            controller.nextDirection = Direction.RIGHT;
        }
        // PRESS DOWN ARROW
        else if (event.keyCode == 40 && controller.currentDirection != Direction.UP) {
            controller.nextDirection = Direction.DOWN;
        }
    }

    private doTick() {
        let controller = SnakeGameController.getInstance();

        setTimeout(() => {
            let newXPos = controller.currentSnakeHead.x;
            let newYPos = controller.currentSnakeHead.y;

            switch (controller.nextDirection) {
                case Direction.UP:    newYPos++; break;
                case Direction.DOWN:  newYPos--; break;
                case Direction.LEFT:  newXPos--; break;
                case Direction.RIGHT: newXPos++; break;
            }

            let newPos = {
                x: newXPos,
                y: newYPos
            };

            controller.snake.moveTo(newPos, false);
            controller.currentSnakeHead = newPos;
            controller.currentDirection = controller.nextDirection;

            if(!controller.isDead) {
                controller.doTick();
            }
        }, controller.speed);
    }

    public static startGame() {
        let controller = SnakeGameController.getInstance();

        // register listener for keyboard-input
        document.addEventListener('keydown', controller.keyboardInput);

        if(controller) {
            controller.doTick();
        }
    }
}
