/**
 * JAVASCRIPT CHO GIAO DIỆN SINH NHẬT QUỲNH TRANG (03/11)
 * Phong cách: Modern Editorial & Soft Warm Aesthetic
 * Tinh tế, Thanh lịch, Không màu mè
 */

document.addEventListener('DOMContentLoaded', () => {
    initCandleRitual();
    initPhotoChanger();
    initGalleryViewer();
    initAudioCapsule();
});

/* =========================================================================
   1. KHOẢNH KHẮC NGUYỆN ƯỚC VỚI BÁNH SINH NHẬT & HOA & TRÁI TIM
   ========================================================================= */
function initCandleRitual() {
    const candleUnit = document.getElementById('candleUnit');
    const cakeWrapper = document.getElementById('birthdayCakeWrapper');
    const blowBtn = document.getElementById('blowActionBtn');
    const relightBtn = document.getElementById('relightActionBtn');
    const revealNote = document.getElementById('wishRevealNote');

    if (blowBtn && candleUnit) {
        blowBtn.addEventListener('click', () => {
            candleUnit.classList.add('is-extinguished');
            blowBtn.style.display = 'none';
            if (relightBtn) relightBtn.style.display = 'inline-flex';
            if (revealNote) revealNote.classList.add('visible');

            // Bùng nổ hoa tươi và trái tim bồng bềnh từ chiếc bánh
            launchFlowersAndHearts(cakeWrapper || blowBtn, 36);
        });
    }

    if (relightBtn && candleUnit) {
        relightBtn.addEventListener('click', () => {
            candleUnit.classList.remove('is-extinguished');
            relightBtn.style.display = 'none';
            if (blowBtn) blowBtn.style.display = 'inline-flex';
            if (revealNote) revealNote.classList.remove('visible');
        });
    }

    // Chạm vào bánh sinh nhật để tung hoa và trái tim bất kỳ lúc nào
    if (cakeWrapper) {
        cakeWrapper.addEventListener('click', (e) => {
            launchFlowersAndHearts(cakeWrapper, 16);
        });
    }
}

function launchFlowersAndHearts(originElement, count = 24) {
    const rect = originElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.4;

    const floralAndHearts = ['🌸', '💖', '🌹', '💕', '🌷', '✨', '❤️', '🌺', '🤍', '✦'];
    
    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.textContent = floralAndHearts[Math.floor(Math.random() * floralAndHearts.length)];
        span.style.position = 'fixed';
        span.style.pointerEvents = 'none';
        span.style.zIndex = '99999';
        span.style.left = `${centerX}px`;
        span.style.top = `${centerY}px`;
        span.style.fontSize = `${Math.random() * 16 + 18}px`;
        span.style.opacity = '1';
        span.style.userSelect = 'none';
        span.style.transition = `transform ${Math.random() * 0.6 + 1.2}s cubic-bezier(0.15, 0.85, 0.35, 1), opacity ${Math.random() * 0.5 + 1.2}s ease`;

        document.body.appendChild(span);

        // Quỹ đạo bay lên bồng bềnh như cánh hoa trong gió
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
        const dist = Math.random() * 180 + 80;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist - 40;
        const rot = (Math.random() - 0.5) * 360;

        requestAnimationFrame(() => {
            span.style.transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${Math.random() * 0.5 + 0.9})`;
            span.style.opacity = '0';
        });

        setTimeout(() => {
            if (span.parentNode) span.parentNode.removeChild(span);
        }, 1800);
    }
}

/* =========================================================================
   2. THAY ĐỔI ẢNH CHÂN DUNG NHANH (PHOTO CHANGER)
   ========================================================================= */
function initPhotoChanger() {
    const input = document.getElementById('hiddenFileInput');
    const btn = document.getElementById('btnChangePhoto');
    const img = document.getElementById('mainPortraitImg');

    if (btn && input && img) {
        btn.addEventListener('click', () => input.click());

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

/* =========================================================================
   3. TRIỂN LÃM ẢNH (GALLERY LIGHTBOX)
   ========================================================================= */
function initGalleryViewer() {
    const viewer = document.getElementById('modalViewer');
    const viewerImg = document.getElementById('viewerImage');
    const viewerCaption = document.getElementById('viewerCaption');
    const closeBtn = document.getElementById('btnCloseViewer');
    const cards = document.querySelectorAll('.art-card');

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const img = card.querySelector('.art-img');
            const title = card.querySelector('.art-title');
            if (img && viewer && viewerImg) {
                viewerImg.src = img.src;
                if (viewerCaption && title) {
                    viewerCaption.textContent = title.textContent;
                }
                viewer.classList.add('active');
            }
        });
    });

    if (closeBtn && viewer) {
        closeBtn.addEventListener('click', () => viewer.classList.remove('active'));
    }

    if (viewer) {
        viewer.addEventListener('click', (e) => {
            if (e.target === viewer) viewer.classList.remove('active');
        });
    }
}

/* =========================================================================
   4. AUDIO CAPSULE TỐI GIẢN
   ========================================================================= */
function initAudioCapsule() {
    const audio = document.getElementById('bgmAudio');
    const toggleBtn = document.getElementById('audioToggleBtn');
    const capsule = document.getElementById('audioCapsule');

    if (!audio || !toggleBtn) return;

    let isPlaying = false;

    function play() {
        audio.play().then(() => {
            isPlaying = true;
            toggleBtn.innerHTML = '⏸';
            if (capsule) capsule.classList.add('is-playing');
        }).catch(() => {
            isPlaying = false;
            toggleBtn.innerHTML = '▶';
            if (capsule) capsule.classList.remove('is-playing');
        });
    }

    function pause() {
        audio.pause();
        isPlaying = false;
        toggleBtn.innerHTML = '▶';
        if (capsule) capsule.classList.remove('is-playing');
    }

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) pause();
        else play();
    });

    // Tự động phát khi tương tác đầu tiên
    const onFirstInteract = () => {
        if (!isPlaying) play();
        window.removeEventListener('click', onFirstInteract);
        window.removeEventListener('touchstart', onFirstInteract);
    };

    window.addEventListener('click', onFirstInteract, { once: true });
    window.addEventListener('touchstart', onFirstInteract, { once: true });
}
