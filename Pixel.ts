export default class Pixel {
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
