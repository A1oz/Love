document.addEventListener('DOMContentLoaded', () => {
    // 1. Generate Floating Hearts Background
    const bgAnimation = document.getElementById('bg-animation');
    const colors = ['#ff4b72', '#ff8fa3', '#ffc3a0', '#ffffff'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-shape');

        // Randomize position, size, animation duration and color
        const size = Math.random() * 15 + 10; // 10px to 25px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        // Fix pseudo-elements sizing via CSS variables or inline styles is tricky in JS, 
        // so we'll just use standard scale via transform.
        const startLeft = Math.random() * 100; // 0 to 100vw
        const duration = Math.random() * 5 + 5; // 5s to 10s

        // Apply inline styles for random variation
        heart.style.left = `${startLeft}vw`;
        heart.style.animationDuration = `${duration}s`;

        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.background = color;
        // Adding pseudo-element colors via a tiny inline stylesheet hack is complex,
        // but since they inherit background in CSS, it works automatically!

        bgAnimation.appendChild(heart);

        // Remove after animation completes to avoid DOM bloat
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    // Create a new heart every 300ms
    setInterval(createHeart, 300);

    // 2. Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(el => observer.observe(el));

    // 3. Interactive "Runaway" Button
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const memeVault = document.getElementById('meme-vault');

    // Make the "No" button run away on hover or click (for mobile)
    const moveBtn = () => {
        // Get random X and Y coordinates within reasonable bounds
        const x = Math.random() * (window.innerWidth - btnNo.clientWidth - 40) - (window.innerWidth / 2) + 100;
        const y = Math.random() * (window.innerHeight - btnNo.clientHeight - 40) - (window.innerHeight / 2) + 100;

        btnNo.style.transform = `translate(${x}px, ${y}px)`;
    };

    btnNo.addEventListener('mouseover', moveBtn);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveBtn();
    });

    // Just in case they somehow click it
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        alert("บอกแล้วไงว่าห้ามปฏิเสธ! 😠 ตอบใหม่เดี๋ยวนี้");
        moveBtn();
    });

    // Handle "Yes" Button Click -> Reveal Meme Vault
    btnYes.addEventListener('click', () => {
        // Change button to indicate success
        btnYes.textContent = "บี๋ก็รักอ้วนนะคะ ❤️";
        btnYes.style.transform = "scale(1.1)";

        // Hide the "No" button
        btnNo.style.display = "none";

        // Show meme vault with a slight delay
        setTimeout(() => {
            memeVault.classList.remove('hidden');
            // Scroll to meme vault smoothly
            memeVault.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);

        // Add extra celebration hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(createHeart, i * 50);
        }
    });
});
