var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 1] = "UP";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["RIGHT"] = 3] = "RIGHT";
    Direction[Direction["LEFT"] = 4] = "LEFT";
})(Direction || (Direction = {}));
class SnakeGame {
    constructor(config) {
        this.config = config;
        document.addEventListener("DOMContentLoaded", this.initGame.bind(this));
    }
    initGame() {
        let grid = new Grid(this.config.game.mainElementId, { x: this.config.grid.size.x, y: this.config.grid.size.y }, this.config.grid.sizePerPixel);
        let minDistance = Math.ceil(this.config.grid.size.x * this.config.grid.size.y / 500);
        let startDirection = Direction[Direction[(Math.ceil(Math.random() * 4))]];
        let randomPoint = this.createRandomPoint();
        let snakeTailStart = {
            x: randomPoint.x > minDistance ? randomPoint.x : minDistance,
            y: randomPoint.y > minDistance ? randomPoint.y : minDistance
        };
        switch (startDirection) {
            case Direction.UP:
                snakeTailStart.x = 1;
                break;
            case Direction.DOWN:
                snakeTailStart.y = this.config.grid.size.y;
                break;
            case Direction.LEFT:
                snakeTailStart.x = this.config.grid.size.x;
                break;
            case Direction.RIGHT:
                snakeTailStart.y = 1;
                break;
        }
        let snake = new Snake(this.config.game.initSnakeLength, grid);
        SnakeGameController.create(grid, snakeTailStart, startDirection, snake, this.config.game.speed);
        document.getElementById("startSnake").addEventListener("click", SnakeGameController.startGame);
    }
    createRandomPoint() {
        return {
            x: Math.floor(Math.random() * this.config.grid.size.x) + 1,
            y: Math.floor(Math.random() * this.config.grid.size.y) + 1
        };
    }
}
class SnakeGameController {
    constructor(grid, start, startDirection, snake, speed) {
        this.isDead = false;
        this.grid = grid;
        this.snake = snake;
        this.speed = speed;
        this.currentSnakeHead = start;
        this.currentDirection = startDirection;
        this.nextDirection = startDirection;
        this.snake.moveTo(this.currentSnakeHead, false);
    }
    static create(grid, start, startDirection, snake, speed) {
        if (!SnakeGameController.instance) {
            SnakeGameController.instance = new SnakeGameController(grid, start, startDirection, snake, speed);
        }
        return SnakeGameController.instance;
    }
    static getInstance() {
        return SnakeGameController.instance;
    }
    keyboardInput(event) {
        let controller = SnakeGameController.getInstance();
        // PRESS LEFT ARROW
        if (event.keyCode == 37 && controller.currentDirection != Direction.RIGHT) {
            controller.nextDirection = Direction.LEFT;
        }
        else if (event.keyCode == 38 && controller.currentDirection != Direction.DOWN) {
            controller.nextDirection = Direction.UP;
        }
        else if (event.keyCode == 39 && controller.currentDirection != Direction.LEFT) {
            controller.nextDirection = Direction.RIGHT;
        }
        else if (event.keyCode == 40 && controller.currentDirection != Direction.UP) {
            controller.nextDirection = Direction.DOWN;
        }
    }
    doTick() {
        let controller = SnakeGameController.getInstance();
        setTimeout(() => {
            let newXPos = controller.currentSnakeHead.x;
            let newYPos = controller.currentSnakeHead.y;
            switch (controller.nextDirection) {
                case Direction.UP:
                    newYPos++;
                    break;
                case Direction.DOWN:
                    newYPos--;
                    break;
                case Direction.LEFT:
                    newXPos--;
                    break;
                case Direction.RIGHT:
                    newXPos++;
                    break;
            }
            let newPos = {
                x: newXPos,
                y: newYPos
            };
            controller.snake.moveTo(newPos, false);
            controller.currentSnakeHead = newPos;
            controller.currentDirection = controller.nextDirection;
            if (!controller.isDead) {
                controller.doTick();
            }
        }, controller.speed);
    }
    static startGame() {
        let controller = SnakeGameController.getInstance();
        // register listener for keyboard-input
        document.addEventListener('keydown', controller.keyboardInput);
        if (controller) {
            controller.doTick();
        }
    }
}
class Snake {
    constructor(initLength, grid) {
        this.snakePositions = [];
        this.minLength = initLength;
        this.grid = grid;
    }
    moveTo(point, ate) {
        this.snakePositions.push(point);
        let bodyPixel = this.grid.getGridPixel(point);
        bodyPixel.setAsBodyPart();
        if (this.snakePositions.length > this.minLength && !ate) {
            let gridPixel = this.grid.getGridPixel(this.snakePositions.shift());
            gridPixel.setAsGridElement();
        }
    }
}
class Pixel {
    constructor(size) {
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
Pixel.BODY_CLASS = "snake-body";
Pixel.PIXEL_CLASS = "snake-pixel";
class Grid {
    constructor(wrapperElementId, size, sizePerPixel) {
        this.gridPixelArray = [];
        this.gridSize = size;
        this.sizePerPixel = sizePerPixel;
        let gridElement = document.createElement("div");
        gridElement.style.width = sizePerPixel * size.x + "px";
        gridElement.className = "snake-grid";
        for (let i = 0; i < size.x * size.y; i++) {
            let pixel = this.createPixel();
            this.gridPixelArray[i] = pixel;
            gridElement.appendChild(pixel.getDivElement());
        }
        document.getElementById(wrapperElementId).appendChild(gridElement);
    }
    createPixel() {
        return new Pixel(this.sizePerPixel);
    }
    getGridPixel(pos) {
        let index = (pos.x - 1) + ((this.gridSize.y - pos.y) * this.gridSize.x);
        return this.gridPixelArray[index];
    }
}
//# sourceMappingURL=snake.js.map