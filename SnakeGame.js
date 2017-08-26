(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Grid", "./SnakeGameController", "./Snake"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Grid_1 = require("./Grid");
    const SnakeGameController_1 = require("./SnakeGameController");
    const Snake_1 = require("./Snake");
    var Direction;
    (function (Direction) {
        Direction[Direction["UP"] = 1] = "UP";
        Direction[Direction["DOWN"] = 2] = "DOWN";
        Direction[Direction["RIGHT"] = 3] = "RIGHT";
        Direction[Direction["LEFT"] = 4] = "LEFT";
    })(Direction = exports.Direction || (exports.Direction = {}));
    class SnakeGame {
        constructor(config) {
            this.config = config;
            console.log("test!");
            this.initGame();
        }
        initGame() {
            let grid = new Grid_1.Grid(this.config.game.mainElementId, { x: this.config.grid.size.x, y: this.config.grid.size.y }, this.config.grid.sizePerPixel);
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
            let snake = new Snake_1.Snake(this.config.game.initSnakeLength, grid);
            SnakeGameController_1.SnakeGameController.create(grid, snakeTailStart, startDirection, snake, this.config.game.speed);
            document.getElementById("startSnake").addEventListener("click", SnakeGameController_1.SnakeGameController.startGame);
        }
        createRandomPoint() {
            return {
                x: Math.floor(Math.random() * this.config.grid.size.x) + 1,
                y: Math.floor(Math.random() * this.config.grid.size.y) + 1
            };
        }
    }
    exports.SnakeGame = SnakeGame;
});
//# sourceMappingURL=SnakeGame.js.map