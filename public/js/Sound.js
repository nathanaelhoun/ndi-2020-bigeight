class Sound {

    constructor(src) {
        this.snd = new Audio();
        this.sound = document.createElement("source");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        this.snd.appendChild(this.sound);
    }

    play = function () {
        this.snd.play();
    };

    stop = function () {
        this.snd.pause();
    };
}