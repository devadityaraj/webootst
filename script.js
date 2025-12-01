document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('boot-video');
    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-btn');
    const dashboard = document.getElementById('dashboard');
    const powerBtn = document.getElementById('power-btn');
    const modal = document.getElementById('confirmation-modal');
    const confirmYes = document.getElementById('confirm-yes');
    const confirmNo = document.getElementById('confirm-no');

    // State management
    let isRebooting = false;

    // Initialize video state
    video.pause();
    video.currentTime = 0;

    // Helper to safely play video
    const playVideo = async () => {
        try {
            video.classList.remove('hidden');
            await video.play();
        } catch (e) {
            console.error("Video play failed:", e);
            // Fallback: if video fails, just show dashboard immediately
            handleVideoEnd();
        }
    };

    // Single source of truth for video ending
    const handleVideoEnd = () => {
        video.classList.add('hidden');

        if (isRebooting) {
            // Show start screen
            startScreen.classList.remove('hidden');
            // Force reflow
            void startScreen.offsetWidth;
            startScreen.style.opacity = '1';
            isRebooting = false;
        } else {
            // Show dashboard
            dashboard.classList.remove('hidden');
            // Force reflow
            void dashboard.offsetWidth;
            dashboard.classList.add('visible');
        }
    };

    video.addEventListener('ended', handleVideoEnd);

    startBtn.addEventListener('click', () => {
        startScreen.style.opacity = '0';

        // Wait for fade out
        setTimeout(() => {
            startScreen.classList.add('hidden');
            playVideo();
        }, 1000);
    });

    powerBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    confirmNo.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    confirmYes.addEventListener('click', () => {
        modal.classList.add('hidden');
        isRebooting = true;

        dashboard.classList.remove('visible');

        setTimeout(() => {
            dashboard.classList.add('hidden');
            video.currentTime = 0;
            playVideo();
        }, 500);
    });
});
