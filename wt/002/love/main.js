document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = 350;

    let started = false;

    // ===== PASSWORD =====
    document.getElementById("unlockBtn").onclick = () => {
        const pass = document.getElementById("password").value;

        if (pass === "38") {
            document.getElementById("lockScreen").style.display = "none";
            document.getElementById("main").classList.remove("hidden");

            typeWriter();
        } else {
            document.getElementById("error").innerText = "Sai mật khẩu rồi 😢";
        }
    };

    // ===== CLICK MỚI MỌC =====
    canvas.addEventListener("click", (e) => {
        if (!started) {
            started = true;

            // 🔥 bật nhạc khi user tương tác (fix mobile)
            music.play();
            disk.style.animationPlayState = "running";
            btn.innerHTML = "⏸️";

            growTree();
        }
    });

    // ===== TEXT CHẠY CHẬM =====
    const lines = [
        "Gửi em iu của anh 💖",
        "",
        "Anh biết chắc chắn rằng anh yêu em...",
        "",
        "Cảm ơn em đã đến bên anh...",
        "",
        "Anh yêu em rất nhiều ❤️"
    ];

    let i = 0, j = 0;
    const codeEl = document.getElementById("code");

    function typeWriter() {
        if (i < lines.length) {
            if (j < lines[i].length) {
                codeEl.innerHTML += lines[i][j];
                j++;
                setTimeout(typeWriter, 50); // chậm hơn
            } else {
                codeEl.innerHTML += "<br/>";
                i++; j = 0;
                setTimeout(typeWriter, 300);
            }
        }
    }

    // ===== TREE =====
    let branches = [];
    let hearts = [];

    function growTree() {
        branches.push({
            x: canvas.width / 2,
            y: canvas.height,
            len: 80,
            angle: -Math.PI / 2,
            width: 8,
            progress: 0
        });

        animate();
    }

    function drawBranch(b) {
        let x2 = b.x + Math.cos(b.angle) * b.progress;
        let y2 = b.y + Math.sin(b.angle) * b.progress;

        ctx.strokeStyle = "#5a2d0c";
        ctx.lineWidth = b.width;

        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return { x: x2, y: y2 };
    }

    function createHeart(x, y) {
        hearts.push({
            x, y,
            alpha: 1,
            dy: Math.random() * 1 + 0.5
        });
    }

    function drawHeart(h) {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.scale(0.06, 0.06);

        ctx.beginPath();
        for (let t = 0; t < Math.PI * 2; t += 0.1) {
            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = -(13 * Math.cos(t) - 5*Math.cos(2*t)
                - 2*Math.cos(3*t) - Math.cos(4*t));
            ctx.lineTo(x, y);
        }

        ctx.fillStyle = `rgba(255,0,100,${h.alpha})`;
        ctx.fill();
        ctx.restore();

        h.y -= h.dy;
        h.alpha -= 0.01;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let newBranches = [];

        branches.forEach(b => {
            let end = drawBranch(b);

            if (b.progress < b.len) {
                b.progress += 2;
                newBranches.push(b);
            } else {
                if (b.width > 2) {
                    let a1 = b.angle + (Math.random()*0.6 - 0.3);
                    let a2 = b.angle - (Math.random()*0.6 - 0.3);

                    newBranches.push({
                        x: end.x,
                        y: end.y,
                        len: b.len * 0.7,
                        angle: a1,
                        width: b.width * 0.7,
                        progress: 0
                    });

                    newBranches.push({
                        x: end.x,
                        y: end.y,
                        len: b.len * 0.7,
                        angle: a2,
                        width: b.width * 0.7,
                        progress: 0
                    });
                } else {
                    createHeart(end.x, end.y);
                }
            }
        });

        branches = newBranches;

        hearts.forEach(drawHeart);
        hearts = hearts.filter(h => h.alpha > 0);

        requestAnimationFrame(animate);
    }

        // ===== MUSIC =====
    const music = document.getElementById("bgm");
    const disk = document.getElementById("disk");
    const btn = document.getElementById("playBtn");

    btn.onclick = toggleMusic;

    function toggleMusic(){
        if(music.paused){
            music.play();
            disk.style.animationPlayState = "running";
            btn.innerHTML = "⏸️";
        }else{
            music.pause();
            disk.style.animationPlayState = "paused";
            btn.innerHTML = "▶️";
        }
    }

});