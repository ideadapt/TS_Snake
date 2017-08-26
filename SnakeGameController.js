(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SnakeGame"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SnakeGame_1 = require("./SnakeGame");
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
            if (event.keyCode == 37 && controller.currentDirection != SnakeGame_1.Direction.RIGHT) {
                controller.nextDirection = SnakeGame_1.Direction.LEFT;
            }
            else if (event.keyCode == 38 && controller.currentDirection != SnakeGame_1.Direction.DOWN) {
                controller.nextDirection = SnakeGame_1.Direction.UP;
            }
            else if (event.keyCode == 39 && controller.currentDirection != SnakeGame_1.Direction.LEFT) {
                controller.nextDirection = SnakeGame_1.Direction.RIGHT;
            }
            else if (event.keyCode == 40 && controller.currentDirection != SnakeGame_1.Direction.UP) {
                controller.nextDirection = SnakeGame_1.Direction.DOWN;
            }
        }
        doTick() {
            let controller = SnakeGameController.getInstance();
            setTimeout(() => {
                let newXPos = controller.currentSnakeHead.x;
                let newYPos = controller.currentSnakeHead.y;
                switch (controller.nextDirection) {
                    case SnakeGame_1.Direction.UP:
                        newYPos++;
                        break;
                    case SnakeGame_1.Direction.DOWN:
                        newYPos--;
                        break;
                    case SnakeGame_1.Direction.LEFT:
                        newXPos--;
                        break;
                    case SnakeGame_1.Direction.RIGHT:
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
    exports.SnakeGameController = SnakeGameController;
});
//# sourceMappingURL=SnakeGameController.js.map