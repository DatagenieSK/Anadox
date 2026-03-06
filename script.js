document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple interaction for CTA buttons
    const mainCta = document.getElementById('cta-main');
    const secondaryCta = document.getElementById('cta-secondary');

    if (mainCta) {
        mainCta.addEventListener('click', () => {
            alert('Redirecting to project onboarding for A4andox...');
        });
    }

    if (secondaryCta) {
        secondaryCta.addEventListener('click', () => {
            alert('Opening contact channels...');
        });
    }
});
