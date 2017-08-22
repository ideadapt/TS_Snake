type Point = {
    readonly x: number;
    readonly y: number;
}

enum Direction {
    UP = 1,
    DOWN = 2,
    RIGHT = 3,
    LEFT = 4
}

class SnakeGame {
    config: any;

    constructor(config: any) {
        this.config = config;
        document.addEventListener("DOMContentLoaded", this.initGame.bind(this));
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

class SnakeGameController {
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

class Snake {
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

class Pixel {
    private static readonly BODY_CLASS = "snake-body";
    private static readonly PIXEL_CLASS = "snake-pixel";
    divElm: HTMLDivElement;

    constructor(size: number) {
        this.divElm = document.createElement("div");
        this.divElm.style.width = size + "px";
        this.divElm.style.height = size + "px";
        this.divElm.setAttribute("name", "pixel");

        this.setAsGridElement();
    }

    getDivElement() {
        return this.divElm;
    }

    setAsBodyPart() {
        this.divElm.className = Pixel.BODY_CLASS;
    }

    setAsGridElement() {
        this.divElm.className = Pixel.PIXEL_CLASS;
    }
}

class Grid {
    gridPixelArray: Pixel[] = [];
    gridSize: Point;
    sizePerPixel: number;

    constructor(wrapperElementId: string, size: Point, sizePerPixel: number) {
        this.gridSize = size;
        this.sizePerPixel = sizePerPixel;

        let gridElement = document.createElement("div");
        gridElement.style.width = sizePerPixel * size.x + "px";
        gridElement.className = "snake-grid";

        for(let i=0; i<size.x*size.y; i++) {
            let pixel = this.createPixel();

            this.gridPixelArray[i] = pixel;
            gridElement.appendChild(pixel.getDivElement());
        }

        document.getElementById(wrapperElementId).appendChild(gridElement);
    }

    private createPixel(): Pixel {
        return new Pixel(this.sizePerPixel)
    }

    getGridPixel(pos: Point): Pixel {
        let index = (pos.x - 1) + ((this.gridSize.y-pos.y) * this.gridSize.x);
        return this.gridPixelArray[index];
    }
}