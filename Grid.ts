import {Point} from "./SnakeGame";
import Pixel from "./Pixel";

export class Grid {
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