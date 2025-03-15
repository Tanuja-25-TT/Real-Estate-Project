// Smooth scrolling for navigation links
document.querySelectorAll('a[href="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

function openModal() {
    document.getElementById('loginModal').classList.add('active');
}

function closeModal() {
    document.getElementById('loginModal').classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == document.getElementById('loginModal')) {
        closeModal();
    }
}
// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        
    } else {
        navbar.style.background = ' ';
    }
});

// Stats counter animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statsElements = entry.target.querySelectorAll('.stat-item h2');
            statsElements.forEach(stat => {
                const finalValue = parseInt(stat.innerText);
                animateValue(stat, 0, finalValue, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Property card hover effect
const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});