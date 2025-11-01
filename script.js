// script.js for Vedam School of Technology Landing Page

document.addEventListener('DOMContentLoaded', () => {
    // Exam date logic
    const examDateElem = document.getElementById('exam-date');
    
    function updateExamDate() {
        const today = new Date();
        const examDay = new Date('2026-07-31');
        
        // If today is before exam, show real date; else (after), set to 'Will be announced'
        if (today < examDay) {
            examDateElem.textContent = '31st July 2026';
        } else {
            examDateElem.textContent = 'Next Exam Date: To Be Announced';
        }
    }
    
    // Only run if element exists
    if (examDateElem) {
        updateExamDate();
    }

    // Registration form validation and submission
    const regForm = document.getElementById('registration-form');
    
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = regForm.name.value.trim();
            const email = regForm.email.value.trim();
            const phone = regForm.phone.value.trim();
            
            if (!name || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation (Indian mobile numbers)
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit mobile number.');
                return;
            }
            
            // Show success message
            alert('Thank you for registering! We will contact you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // YouTube video redirects
    const youtubeLinks = document.querySelectorAll('.youtube-link');
    const videoUrls = {
        'VIDEO_ID_1': 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_1',
        'VIDEO_ID_2': 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_2'
    };
    
    youtubeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            const url = videoUrls[videoId];
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-on-scroll');
        observer.observe(section);
    });

    // Countdown timer for registration deadline
    function updateCountdown() {
        const deadline = new Date('March 12, 2026 23:59:59').getTime();
        const now = new Date().getTime();
        const timeLeft = deadline - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            
            // Update countdown display if element exists
            const countdownElement = document.getElementById('countdown-timer');
            if (countdownElement) {
                countdownElement.textContent = `${days}d ${hours}h left`;
            }
        }
    }

    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 3600000); // Update every hour
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .fade-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);