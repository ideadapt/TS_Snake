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
    exports.Grid = Grid;
});
//# sourceMappingURL=Grid.js.map