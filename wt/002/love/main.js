// ===== PASSWORD =====
function checkPassword() {
    const pass = document.getElementById("password").value;

    if (pass === "emiuanh") {
        document.getElementById("lockScreen").style.display = "none";
        document.getElementById("main").classList.remove("hidden");

        setTimeout(showPopup, 2000);
    } else {
        document.getElementById("error").innerText = "Nhầm rồi ạ";
    }
}


// ===== POPUP =====
function showPopup() {
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("popup").classList.add("hidden");
}


// ===== TYPE TEXT =====
const text = "💞 Anh không giỏi nói nhiều... nhưng anh yêu em 💞";
let i = 0;

function typing() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text[i];
        i++;
        setTimeout(typing, 50);
    }
}
typing();


// ===== MUSIC =====
const audio = document.getElementById("audio");
const disc = document.getElementById("disc");

function toggleMusic() {
    if (audio.paused) {
        audio.play();
        disc.style.animationPlayState = "running";
    } else {
        audio.pause();
        disc.style.animationPlayState = "paused";
    }
}


// ===== HEART TREE (Canvas) =====
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 300;

function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - size, x - size, y - size, x - size, y);
    ctx.bezierCurveTo(x - size, y + size, x, y + size, x, y + size*2);
    ctx.bezierCurveTo(x, y + size, x + size, y + size, x + size, y);
    ctx.bezierCurveTo(x + size, y - size, x, y - size, x, y);
    ctx.fillStyle = "pink";
    ctx.fill();
}

let hearts = [];

for (let i = 0; i < 50; i++) {
    hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 1 + 0.5
    });
}

function animateHearts() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    hearts.forEach(h => {
        drawHeart(h.x, h.y, h.size);
        h.y -= h.speed;
        if (h.y < 0) h.y = canvas.height;
    });

    requestAnimationFrame(animateHearts);
}

animateHearts();


// ===== INPUT HEART =====
const input = document.getElementById("loveInput");
const heart = document.getElementById("heart");

input.addEventListener("input", () => {
    heart.style.opacity = input.value ? 1 : 0;
});