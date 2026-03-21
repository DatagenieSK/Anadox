// 0. System Boot Loader Logic
const loader = document.getElementById('a4-loader');

// We use window.addEventListener('load') to ensure all images and assets are fully loaded
window.addEventListener('load', () => {
    // Enforce a minimum display time of 2.4 seconds so the boot animation plays out fully
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2400); 
});

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Custom Cursor tracking (Desktop)
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // 2. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for the sticky header offset
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stops observing once it has animated in
            }
        });
    }, observerOptions);

    // Select all elements with the animate-on-scroll class and observe them
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // 4. Form Submission & LocalStorage Logic
    const contactForm = document.getElementById('a4ContactForm');
    const successToast = document.getElementById('successToast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents page reload

            // Gather form data
            const formData = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                message: document.getElementById('userMessage').value,
                date: new Date().toLocaleString()
            };

            // Fetch existing submissions or create an empty array
            let submissions = JSON.parse(localStorage.getItem('a4Submissions')) || [];
            submissions.push(formData);
            
            // Save back to localStorage
            localStorage.setItem('a4Submissions', JSON.stringify(submissions));

            // Trigger Animation Toast
            successToast.classList.add('show');
            contactForm.reset();

            // Hide Toast after 3.5 seconds
            setTimeout(() => {
                successToast.classList.remove('show');
            }, 3500);
        });
    }

    // 5. NEW: Hero Terminal Typing Animation
    const heroTerminal = document.querySelector('.hero-terminal .terminal-body');
    if (heroTerminal) {
        const lines = heroTerminal.querySelectorAll('.code-line');
        // Hide all lines initially
        lines.forEach(line => line.style.display = 'none'); 

        // Wait for the main boot loader to finish before starting the terminal typing
        setTimeout(() => {
            let delay = 0;
            lines.forEach((line) => {
                setTimeout(() => {
                    line.style.display = 'block';
                }, delay);
                delay += 450; // 450ms wait between each line popping up
            });
        }, 2600); // 2.6 seconds delay matches the loader finishing
    }

});