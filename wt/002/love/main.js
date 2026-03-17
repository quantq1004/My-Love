document.addEventListener("DOMContentLoaded", () => {

    const audio = document.getElementById("audio");
    const disc = document.getElementById("disc");
    const codeEl = document.getElementById("code");

    // ===== PASSWORD =====
    document.getElementById("unlockBtn").onclick = () => {
        const pass = document.getElementById("password").value;

        if (pass === "38") {
            document.getElementById("lockScreen").style.display = "none";
            document.getElementById("main").classList.remove("hidden");

            typeWriter(); // chạy text luôn
        } else {
            document.getElementById("error").innerText = "Em iu nhầm rồi ạ ^^";
        }
    };

    // ===== TYPE WRITER =====
    const lines = [
        "Gửi Quỳnh Trang đáng yêu của anh,",
        "",
        "Anh biết chắc chắn rằng anh yêu em.",
        "",
        "Anh biết em là một cô gái đáng yêu, giỏi giang, xinh đẹp, tốt bụng và dịu dàng.",
        "",
        "Anh cảm nhận được rằng ngày mà em đến chính là định mệnh giữa anh và em.",
        "",
        "Mong chúng ta sẽ thật hạnh phúc,",
        "",
        "Anh thực sự chỉ muốn nói với em từ tận đáy lòng:",
        "",
        "Anh thích em, anh yêu em, anh thương em",
        "",
        "Cảm ơn định mệnh đã cho anh và em gặp nhau",
        "",
        "Cảm ơn em đã hiện diện trong cuộc đời của anh",
        "",
        "Anh rất hạnh phúc khi gặp được em, người mà anh yêu.",
        "",
        "Anh thực sự hy vọng rằng em cũng yêu anh như cách anh yêu em.",
        "",
        "Anh yêu em rất nhiều, cô gái nhỏ của anh.",
        "",
        "Chúng mình phải thật hạnh phúc nhaaaa.",
        "",
        "Yêu emm,",
        "",
        "- Anh iu của em iu xinh đẹp, Anh ơiiii."
    ];

    let lineIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        if (lineIndex < lines.length) {
            let line = lines[lineIndex];

            if (charIndex < line.length) {
                codeEl.innerHTML += line[charIndex];
                charIndex++;
                setTimeout(typeWriter, 25);
            } else {
                codeEl.innerHTML += "<br/>";
                lineIndex++;
                charIndex = 0;
                setTimeout(typeWriter, 200);
            }
        }
    }

    // ===== MUSIC =====
    document.getElementById("musicBtn").onclick = () => {
        if (audio.paused) {
            audio.play().catch(() => {});
            disc.style.animationPlayState = "running";
            document.getElementById("musicBtn").innerText = "⏸️";
        } else {
            audio.pause();
            disc.style.animationPlayState = "paused";
            document.getElementById("musicBtn").innerText = "▶️";
        }
    };

    // ===== INPUT HEART =====
    const input = document.getElementById("loveInput");
    const heart = document.getElementById("heart");

    input.addEventListener("input", () => {
        heart.style.opacity = input.value ? 1 : 0;
    });

    // ===== HEART TREE =====
    initHeartTree();

    function initHeartTree() {
        const canvas = document.getElementById("heartCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = canvas.offsetWidth;
        canvas.height = 300;

        function heart(t) {
            return {
                x: 16 * Math.pow(Math.sin(t), 3),
                y: 13 * Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t)
            };
        }

        let points = [];
        for (let t = 0; t < Math.PI * 2; t += 0.05) {
            let p = heart(t);
            points.push({
                x: canvas.width/2 + p.x * 10,
                y: canvas.height/2 - p.y * 10,
                alpha: 0
            });
        }

        function draw() {
            ctx.clearRect(0,0,canvas.width,canvas.height);

            points.forEach(p => {
                if (p.alpha < 1) p.alpha += 0.01;
                ctx.fillStyle = `rgba(255,105,180,${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
                ctx.fill();
            });

            requestAnimationFrame(draw);
        }

        draw();
    }
});