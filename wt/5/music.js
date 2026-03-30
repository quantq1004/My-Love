// đảm bảo DOM load xong
document.addEventListener("DOMContentLoaded", () => {

    const music = document.getElementById("music");
    const disk = document.getElementById("disk");
    const playBtn = document.getElementById("playBtn");
    const playIcon = document.getElementById("playIcon");
    const musicBox = document.querySelector(".music-box");

    let playing = false;

    function toggleMusic() {
        if (!playing) {
            music.play().catch(() => {});
            disk.style.animationPlayState = "running";
            playIcon.src = "pause.png";
        } else {
            music.pause();
            disk.style.animationPlayState = "paused";
            playIcon.src = "play.png";
        }
        playing = !playing;
    }

    musicBox.addEventListener("click", toggleMusic);

    playBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMusic();
    });

});