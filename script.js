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
        // Replace with your actual form submission endpoint
        // Option 1: Use Formspree (free service)
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });
        
        // Option 2: Use your own backend endpoint
        // const response = await fetch('https://farewell.ph/api/waitlist', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });
        
        // For demo purposes, simulate successful submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Log to console (for testing)
        console.log('Form submitted:', data);
        
        // Store in localStorage as backup
        const submissions = JSON.parse(localStorage.getItem('waitlist_submissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('waitlist_submissions', JSON.stringify(submissions));
        
        // Show success message
        signupForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Optional: Send to Google Sheets or other service
        // You can integrate with Google Sheets API or Zapier webhook here
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your information. Please try again or contact us directly at hello@farewell.ph');
        
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
        header.style.boxShadow = '0 4px 12px rgba(30, 58, 95, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(30, 58, 95, 0.06)';
    }
    
    lastScroll = currentScroll;
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
