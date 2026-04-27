// ===========================
// Gallery Modal Functionality
// ===========================

const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.modal-close');
const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

let currentImageIndex = 0;

// Open modal on gallery item click
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openModal(index);
    });
});

function openModal(index) {
    currentImageIndex = index;
    const clickedItem = galleryItems[index];
    const img = clickedItem.querySelector('img');
    const caption = clickedItem.querySelector('.gallery-overlay span');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalCaption.textContent = caption.textContent;
    document.body.style.overflow = 'hidden';
}

// Close modal
closeModal.addEventListener('click', () => {
    closeModalFunc();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Navigate images
prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    updateModalImage();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    updateModalImage();
});

function updateModalImage() {
    const currentItem = galleryItems[currentImageIndex];
    const img = currentItem.querySelector('img');
    const caption = currentItem.querySelector('.gallery-overlay span');
    
    modalImg.src = img.src;
    modalCaption.textContent = caption.textContent;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeModalFunc();
        } else if (e.key === 'ArrowLeft') {
            nextBtn.click();
        } else if (e.key === 'ArrowRight') {
            prevBtn.click();
        }
    }
});

// ===========================
// Contact Form to WhatsApp
// ===========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Format WhatsApp message
    const whatsappMessage = `
שלום, שמי ${fullName}

📱 טלפון: ${phone}

📝 תיאור העבודה:
${message}

אשמח לקבל הצעת מחיר.
תודה!
    `.trim();
    
    // WhatsApp number (replace with actual number)
    const whatsappNumber = '972501234567';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Optional: Reset form
    contactForm.reset();
    
    // Optional: Show success message
    showNotification('הפנייה נשלחה בהצלחה! נפתח עבורך וואטסאפ...', 'success');
});

// ===========================
// Scroll to Top Button
// ===========================

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash or contact/gallery modals
        if (href === '#' || href === '#!') {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Scroll Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .benefit-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// Notification System
// ===========================

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Phone Number Formatting
// ===========================

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    if (value.length >= 3) {
        value = value.slice(0, 3) + '-' + value.slice(3);
    }
    if (value.length >= 8) {
        value = value.slice(0, 8) + value.slice(8);
    }
    
    e.target.value = value;
});

// ===========================
// Loading Animation (Optional)
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Prevent Right Click on Images (Optional)
// ===========================

// Uncomment if you want to protect images
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});
*/

// ===========================
// Analytics Event Tracking (Optional)
// ===========================

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', () => {
        const btnText = btn.textContent.trim();
        console.log('Button clicked:', btnText);
        
        // Add your analytics code here
        // Example: gtag('event', 'click', { 'event_category': 'CTA', 'event_label': btnText });
    });
});

// Track form submission
contactForm.addEventListener('submit', () => {
    console.log('Form submitted');
    
    // Add your analytics code here
    // Example: gtag('event', 'submit', { 'event_category': 'Form', 'event_label': 'Contact Form' });
});

// ===========================
// Performance: Lazy Loading Images
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // If you want to use lazy loading, add data-src attribute to images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Mobile Menu Toggle (if needed)
// ===========================

// Add this if you decide to add a navigation menu later
/*
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}
*/

console.log('🔨 מסגריית שלומוב - האתר נטען בהצלחה!');