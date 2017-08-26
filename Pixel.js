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
//# sourceMappingURL=Pixel.js.map