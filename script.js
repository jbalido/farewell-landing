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

// Form submission handler - shared function
async function submitFormData(formData, submitButton, originalText) {
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        business: formData.get('business') || '',
        role: 'provider',
        message: formData.get('message') || ''
    };
    
    try {
        // Submit to Google Sheets via Web App
        await fetch('https://script.google.com/macros/s/AKfycbzPSZoIx70dJv3VvakX0sibfv_GbT8P_FQgO7zVANZ-FtuIM3ejSwmHj_AlVVrBgnAf7A/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        console.log('Form submitted to Google Sheets:', data);
        
        // Store in localStorage as backup
        const submissions = JSON.parse(localStorage.getItem('waitlist_submissions') || '[]');
        submissions.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('waitlist_submissions', JSON.stringify(submissions));
        
        // Show success message by replacing form
        const formContainer = submitButton.closest('form');
        formContainer.innerHTML = `
            <div class="success-message" style="display: block; text-align: center; padding: 2rem;">
                <div class="success-icon" style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                <h3 style="font-size: 1.75rem; color: var(--success); margin-bottom: 0.5rem;">Thank You!</h3>
                <p style="color: white; font-size: 1.125rem; text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);">We've received your information and will be in touch within 24 hours.</p>
            </div>
        `;
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your information. Please try again or contact us directly at info@farewell.ph');
        
        // Re-enable submit button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

// Quick signup form handler
const quickSignupForm = document.getElementById('quickSignupForm');
if (quickSignupForm) {
    quickSignupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(quickSignupForm);
        const submitButton = quickSignupForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        await submitFormData(formData, submitButton, originalText);
    });
}

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

// Download brochure as PDF
window.downloadBrochure = async function() {
    const button = event.target;
    const originalText = button.textContent;
    
    try {
        button.textContent = '⏳ Preparing PDF...';
        button.disabled = true;
        
        // Open brochure in hidden iframe and trigger print
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = 'brochure.html?print=true';
        document.body.appendChild(iframe);
        
        // Wait for iframe to load
        iframe.onload = function() {
            setTimeout(() => {
                try {
                    iframe.contentWindow.print();
                    button.textContent = originalText;
                    button.disabled = false;
                    
                    // Remove iframe after print dialog closes
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                    }, 1000);
                } catch (error) {
                    console.error('Print error:', error);
                    // Fallback: open in new tab
                    window.open('brochure.html', '_blank');
                    button.textContent = originalText;
                    button.disabled = false;
                    document.body.removeChild(iframe);
                }
            }, 500);
        };
        
        // Fallback if iframe fails to load
        iframe.onerror = function() {
            window.open('brochure.html', '_blank');
            button.textContent = originalText;
            button.disabled = false;
            document.body.removeChild(iframe);
        };
        
    } catch (error) {
        console.error('Download error:', error);
        // Fallback: open in new tab
        window.open('brochure.html', '_blank');
        button.textContent = originalText;
        button.disabled = false;
    }
};

// Console message for developers
console.log('%c🕊️ Farewell PH', 'font-size: 24px; font-weight: bold; color: #2c5282;');
console.log('%cTo export waitlist submissions, run: exportSubmissions()', 'font-size: 14px; color: #4a5568;');
