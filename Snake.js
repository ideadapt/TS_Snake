(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Snake = Snake;
});
//# sourceMappingURL=Snake.js.map