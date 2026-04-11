// ===== SWIPER =====
new Swiper(".mySwiper", {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
});

// ===== EFFECT =====
const emojis = ["❤️","💖","💕","🌸","🌺"];

function spawnEffect(className, duration = 6000) {
    const el = document.createElement("div");
    el.className = className;
    el.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

    el.style.left = Math.random()*100 + "vw";
    el.style.top = "-20px";
    el.style.animationDuration = (5 + Math.random()*3) + "s";

    document.body.appendChild(el);
    setTimeout(()=>el.remove(), duration);
}

setInterval(()=>spawnEffect("heart-drop"), 600);

// ===== MUSIC =====
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
const volume = document.getElementById("volume");
const vinyl = document.querySelector(".vinyl");

let isPlaying = false;

function toggleMusic(){
    if(isPlaying){
        music.pause();
        playBtn.innerHTML="▶";
        vinyl.style.animationPlayState="paused";
    }else{
        music.play();
        playBtn.innerHTML="⏸";
        vinyl.style.animationPlayState="running";
    }
    isPlaying = !isPlaying;
}

playBtn.addEventListener("click", toggleMusic);

volume.addEventListener("input", e=>{
    music.volume = e.target.value;
});

document.body.addEventListener("click", ()=>{
    if(!isPlaying){
        music.play();
        playBtn.innerHTML="⏸";
        vinyl.style.animationPlayState="running";
        isPlaying = true;
    }
},{once:true});