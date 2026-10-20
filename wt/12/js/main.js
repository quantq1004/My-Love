/**
 * Chúc Mừng Ngày Phụ Nữ 20/10 - Dành tặng Quỳnh Trang ❤️
 * Hiệu ứng hoa rơi, trái tim bay, âm nhạc và tương tác lãng mạn
 */

document.addEventListener('DOMContentLoaded', () => {
    initCanvases();
    initClickEffects();
    initMusicPlayer();
    initLoveTimer();
    initGiftCards();
    initInteractiveCounters();
    initPhotoChanger();
});

/* =========================================================================
   1. HIỆU ỨNG HOA RƠI & TRÁI TIM BAY (CANVAS HIGH-PERFORMANCE ENGINE)
   ========================================================================= */
let flowerCtx, heartCtx;
let flowerCanvas, heartCanvas;
let flowers = [];
let hearts = [];
let stars = [];

function initCanvases() {
    flowerCanvas = document.getElementById('flowerCanvas');
    heartCanvas = document.getElementById('heartCanvas');

    if (!flowerCanvas || !heartCanvas) return;

    flowerCtx = flowerCanvas.getContext('2d');
    heartCtx = heartCanvas.getContext('2d');

    resizeCanvases();
    window.addEventListener('resize', resizeCanvases);

    // Khởi tạo các phần tử
    const flowerCount = window.innerWidth < 768 ? 25 : 45;
    const heartCount = window.innerWidth < 768 ? 20 : 35;
    const starCount = window.innerWidth < 768 ? 30 : 60;

    for (let i = 0; i < flowerCount; i++) {
        flowers.push(createFlower(true));
    }

    for (let i = 0; i < heartCount; i++) {
        hearts.push(createHeart(true));
    }

    for (let i = 0; i < starCount; i++) {
        stars.push(createStar());
    }

    requestAnimationFrame(renderLoop);
}

function resizeCanvases() {
    flowerCanvas.width = window.innerWidth;
    flowerCanvas.height = window.innerHeight;
    heartCanvas.width = window.innerWidth;
    heartCanvas.height = window.innerHeight;
}

function createFlower(randomY = false) {
    const types = ['🌸', '🌺', '🌹', '🌷', '🏵️', '💮'];
    return {
        x: Math.random() * window.innerWidth,
        y: randomY ? Math.random() * window.innerHeight : -40,
        size: Math.random() * 16 + 14,
        char: types[Math.floor(Math.random() * types.length)],
        speedX: Math.sin(Math.random() * Math.PI) * 1.5 - 0.75,
        speedY: Math.random() * 1.6 + 1.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2.5,
        opacity: Math.random() * 0.6 + 0.4,
        swing: Math.random() * 2,
        swingSpeed: Math.random() * 0.03 + 0.01,
        swingOffset: Math.random() * Math.PI * 2
    };
}

function createHeart(randomY = false) {
    const heartSymbols = ['💖', '💕', '💗', '💓', '❤️', '💝'];
    return {
        x: Math.random() * window.innerWidth,
        y: randomY ? Math.random() * window.innerHeight : window.innerHeight + 40,
        size: Math.random() * 18 + 14,
        char: heartSymbols[Math.floor(Math.random() * heartSymbols.length)],
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: -(Math.random() * 1.8 + 1.1),
        opacity: Math.random() * 0.7 + 0.3,
        scale: 1,
        swingSpeed: Math.random() * 0.04 + 0.02,
        swingOffset: Math.random() * Math.PI * 2
    };
}

function createStar() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.5 + 0.8,
        opacity: Math.random(),
        speed: Math.random() * 0.03 + 0.01
    };
}

let tick = 0;
function renderLoop() {
    tick++;

    // Xóa nền canvas
    flowerCtx.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);
    heartCtx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);

    // Vẽ sao lấp lánh (Background Stars)
    for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.opacity += s.speed;
        if (s.opacity > 1 || s.opacity < 0.1) s.speed = -s.speed;

        heartCtx.fillStyle = `rgba(255, 105, 180, ${Math.max(0.15, s.opacity * 0.7)})`;
        heartCtx.shadowBlur = 6;
        heartCtx.shadowColor = '#ff69b4';
        heartCtx.beginPath();
        heartCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        heartCtx.fill();
        heartCtx.shadowBlur = 0;
    }

    // Vẽ & di chuyển trái tim (Hearts floating up)
    for (let i = 0; i < hearts.length; i++) {
        const h = hearts[i];
        h.y += h.speedY;
        h.x += Math.sin(tick * h.swingSpeed + h.swingOffset) * 0.8;

        heartCtx.save();
        heartCtx.globalAlpha = h.opacity;
        heartCtx.font = `${h.size}px Arial`;
        heartCtx.fillText(h.char, h.x, h.y);
        heartCtx.restore();

        // Tái sinh nếu bay quá màn hình
        if (h.y < -50 || h.x < -50 || h.x > window.innerWidth + 50) {
            hearts[i] = createHeart(false);
        }
    }

    // Vẽ & di chuyển hoa rơi (Flowers falling down)
    for (let i = 0; i < flowers.length; i++) {
        const f = flowers[i];
        f.y += f.speedY;
        f.x += Math.cos(tick * f.swingSpeed + f.swingOffset) * 1.2 + f.speedX;
        f.rotation += f.rotationSpeed;

        flowerCtx.save();
        flowerCtx.globalAlpha = f.opacity;
        flowerCtx.translate(f.x, f.y);
        flowerCtx.rotate((f.rotation * Math.PI) / 180);
        flowerCtx.font = `${f.size}px Arial`;
        flowerCtx.fillText(f.char, -f.size / 2, f.size / 2);
        flowerCtx.restore();

        // Tái sinh nếu rơi quá đáy màn hình
        if (f.y > window.innerHeight + 50 || f.x < -60 || f.x > window.innerWidth + 60) {
            flowers[i] = createFlower(false);
        }
    }

    requestAnimationFrame(renderLoop);
}

/* =========================================================================
   2. HIỆU ỨNG TƯƠNG TÁC CHẠM / CLICK BUNG TỎA HOA VÀ TIM
   ========================================================================= */
function initClickEffects() {
    window.addEventListener('click', (e) => {
        // Tránh bung hạt nếu click vào nút điều khiển nhạc hoặc input
        if (e.target.closest('.music-bar') || e.target.closest('#photoInput')) return;
        createBurst(e.clientX, e.clientY);
    });
}

function createBurst(x, y, count = 12) {
    const burstSymbols = ['🌸', '💖', '🌹', '✨', '💕', '🌷', '🌺', '👑', '💝'];
    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.className = 'click-heart';
        span.textContent = burstSymbols[Math.floor(Math.random() * burstSymbols.length)];

        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const distance = Math.random() * 120 + 50;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const rot = (Math.random() - 0.5) * 180;
        const fontSize = Math.random() * 18 + 18;

        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.fontSize = `${fontSize}px`;
        span.style.setProperty('--dx', `${dx}px`);
        span.style.setProperty('--dy', `${dy}px`);
        span.style.setProperty('--rot', `${rot}deg`);

        document.body.appendChild(span);
        setTimeout(() => {
            if (span.parentNode) span.parentNode.removeChild(span);
        }, 1400);
    }
}

/* =========================================================================
   3. NÚT TƯƠNG TÁC THẢ TIM & BẮN HOA & ĐẾM
   ========================================================================= */
let heartCountVal = 999;
let flowerCountVal = 520;

function initInteractiveCounters() {
    const heartBtn = document.getElementById('heartActionBtn');
    const flowerBtn = document.getElementById('flowerActionBtn');
    const letterBtn = document.getElementById('letterActionBtn');

    if (heartBtn) {
        heartBtn.addEventListener('click', (e) => {
            heartCountVal++;
            document.getElementById('heartCountDisplay').textContent = heartCountVal;
            const rect = heartBtn.getBoundingClientRect();
            createBurst(rect.left + rect.width / 2, rect.top, 25);

            // Bổ sung thêm tim vào canvas
            for (let i = 0; i < 8; i++) {
                hearts.push(createHeart(false));
            }
        });
    }

    if (flowerBtn) {
        flowerBtn.addEventListener('click', (e) => {
            flowerCountVal++;
            document.getElementById('flowerCountDisplay').textContent = flowerCountVal;
            const rect = flowerBtn.getBoundingClientRect();
            createBurst(rect.left + rect.width / 2, rect.top, 25);

            // Bổ sung thêm hoa vào canvas
            for (let i = 0; i < 8; i++) {
                flowers.push(createFlower(false));
            }
        });
    }

    if (letterBtn) {
        letterBtn.addEventListener('click', () => {
            const letterSection = document.getElementById('letterSection');
            if (letterSection) {
                letterSection.scrollIntoView({ behavior: 'smooth' });
                const rect = letterSection.getBoundingClientRect();
                createBurst(rect.left + rect.width / 2, window.innerHeight / 2, 20);
            }
        });
    }
}

/* =========================================================================
   4. 4 HỘP QUÀ TÌNH YÊU 20/10 (GIFT CARDS)
   ========================================================================= */
function initGiftCards() {
    const cards = document.querySelectorAll('.gift-card');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.toggle('opened');
            const rect = card.getBoundingClientRect();
            createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16);
        });
    });
}

/* =========================================================================
   5. BỘ ĐẾM THỜI GIAN BÊN NHAU (LOVE TIMER)
   ========================================================================= */
function initLoveTimer() {
    // Ngày kỷ niệm của Quang Quân & Quỳnh Trang (Ngày bắt đầu: 12/03/2026 hoặc chỉnh sửa tự do)
    const startDate = new Date('2026-03-12T00:00:00');

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) {
            // Trường hợp tương lai nếu mốc thời gian lớn hơn
            document.getElementById('timerDays').textContent = '00';
            document.getElementById('timerHours').textContent = '00';
            document.getElementById('timerMinutes').textContent = '00';
            document.getElementById('timerSeconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const elDays = document.getElementById('timerDays');
        const elHours = document.getElementById('timerHours');
        const elMins = document.getElementById('timerMinutes');
        const elSecs = document.getElementById('timerSeconds');

        if (elDays) elDays.textContent = days < 10 ? '0' + days : days;
        if (elHours) elHours.textContent = hours < 10 ? '0' + hours : hours;
        if (elMins) elMins.textContent = minutes < 10 ? '0' + minutes : minutes;
        if (elSecs) elSecs.textContent = seconds < 10 ? '0' + seconds : seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

/* =========================================================================
   6. TRÌNH PHÁT NHẠC (MUSIC PLAYER VỚI PLAYLIST CHỌN LỌC)
   ========================================================================= */
const playlist = [
    {
        title: "Có em đời bỗng vui",
        artist: "Chillies",
        src: "audio/co-em-doi-bong-vui.mp3"
    },
    {
        title: "Giải cứu thế giới",
        artist: "Tinh hà - say hi",
        src: "audio/giai-cuu-the-gioi.mp3"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;
let audioEl = null;

function initMusicPlayer() {
    audioEl = document.getElementById('bgAudio');
    const playBtn = document.getElementById('musicPlayBtn');
    const nextBtn = document.getElementById('musicNextBtn');
    const prevBtn = document.getElementById('musicPrevBtn');
    const diskBox = document.getElementById('diskBox');
    const titleEl = document.getElementById('musicTitle');
    const artistEl = document.getElementById('musicArtist');

    if (!audioEl) return;

    function loadTrack(index) {
        currentTrackIndex = index;
        const track = playlist[currentTrackIndex];
        audioEl.src = track.src;
        if (titleEl) titleEl.textContent = track.title;
        if (artistEl) artistEl.textContent = track.artist;
    }

    function playTrack() {
        audioEl.play().then(() => {
            isPlaying = true;
            if (diskBox) diskBox.classList.add('playing');
            if (playBtn) playBtn.innerHTML = '⏸';
        }).catch(() => {
            isPlaying = false;
            if (diskBox) diskBox.classList.remove('playing');
            if (playBtn) playBtn.innerHTML = '▶';
        });
    }

    function pauseTrack() {
        audioEl.pause();
        isPlaying = false;
        if (diskBox) diskBox.classList.remove('playing');
        if (playBtn) playBtn.innerHTML = '▶';
    }

    function togglePlay() {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }

    if (playBtn) playBtn.addEventListener('click', togglePlay);

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentTrackIndex + 1) % playlist.length;
            loadTrack(nextIndex);
            playTrack();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
            loadTrack(prevIndex);
            playTrack();
        });
    }

    // Khi bài hát kết thúc tự động chuyển sang bài tiếp theo
    audioEl.addEventListener('ended', () => {
        let nextIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(nextIndex);
        playTrack();
    });

    loadTrack(0);

    // Tự động phát khi người dùng tương tác lần đầu với trang web
    const startAudioOnFirstTouch = () => {
        if (!isPlaying) {
            playTrack();
        }
        window.removeEventListener('click', startAudioOnFirstTouch);
        window.removeEventListener('touchstart', startAudioOnFirstTouch);
    };

    window.addEventListener('click', startAudioOnFirstTouch, { once: true });
    window.addEventListener('touchstart', startAudioOnFirstTouch, { once: true });
}

/* =========================================================================
   7. THAY ĐỔI ẢNH CHÂN DUNG NHANH (INSTANT PREVIEW CHO NGƯỜI DÙNG)
   ========================================================================= */
function initPhotoChanger() {
    const photoInput = document.getElementById('photoInput');
    const portraitImg = document.getElementById('portraitImg');
    const changeBtn = document.getElementById('changePhotoBtn');

    if (changeBtn && photoInput) {
        changeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            photoInput.click();
        });

        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && portraitImg) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    portraitImg.src = event.target.result;
                    // Hiệu ứng pháo hoa chúc mừng ảnh mới
                    const rect = portraitImg.getBoundingClientRect();
                    createBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}
