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
    document.addEventListener("DOMContentLoaded", () => {
        new SnakeGame_1.SnakeGame({
            "grid": {
                "size": {
                    "x": 50,
                    "y": 50
                },
                "sizePerPixel": 15
            },
            "game": {
                "mainElementId": "snake",
                "initSnakeLength": 5,
                "speed": 500
            }
        });
    });
});
//# sourceMappingURL=main.js.map