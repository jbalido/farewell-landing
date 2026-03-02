// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
const signupForm = document.getElementById('signupForm');
const successMessage = document.getElementById('successMessage');

signupForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(signupForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        business: formData.get('business'),
        role: formData.get('role'),
        message: formData.get('message')
    };
    
    // Disable submit button
    const submitButton = signupForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    try {
        // Submit to Google Sheets via Web App
        const response = await fetch('https://script.google.com/macros/s/AKfycby6ccjeYxtGqvRFqVfizt1Q7sF-GcWa80egzkOwRsPzzslw8S_-a60hkU9C1cMMacJ3EA/exec', {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        // Note: no-cors mode doesn't allow reading the response
        // We'll assume success if no error is thrown
        console.log('Form submitted to Google Sheets:', data);
        
        // Also store in localStorage as backup
        const submissions = JSON.parse(localStorage.getItem('waitlist_submissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('waitlist_submissions', JSON.stringify(submissions));
        
        // Show success message
        signupForm.style.display = 'none';
        successMessage.style.display = 'block';
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your information. Please try again or contact us directly at info@farewell.ph');
        
        // Re-enable submit button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.stat-card, .benefit-card, .feature-card, .contact-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(15, 23, 42, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Export submissions function (for admin use)
window.exportSubmissions = function() {
    const submissions = JSON.parse(localStorage.getItem('waitlist_submissions') || '[]');
    if (submissions.length === 0) {
        alert('No submissions to export');
        return;
    }
    
    // Convert to CSV
    const headers = ['Name', 'Email', 'Business', 'Role', 'Message', 'Timestamp'];
    const csv = [
        headers.join(','),
        ...submissions.map(sub => [
            sub.name,
            sub.email,
            sub.business || '',
            sub.role,
            (sub.message || '').replace(/,/g, ';'),
            sub.timestamp
        ].join(','))
    ].join('\n');
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `farewell-ph-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
};

// Console message for developers
console.log('%c🕊️ Farewell PH', 'font-size: 24px; font-weight: bold; color: #2c5282;');
console.log('%cTo export waitlist submissions, run: exportSubmissions()', 'font-size: 14px; color: #4a5568;');
