import {SnakeGame} from "./SnakeGame";

document.addEventListener("DOMContentLoaded", () => {
    new SnakeGame({
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
    })
});