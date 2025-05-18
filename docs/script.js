// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Zen Navigation System
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target) && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Wellness Program Details Expansion
    const programButtons = document.querySelectorAll('.program-info');
    
    programButtons.forEach(button => {
        button.addEventListener('click', () => {
            const programCard = button.closest('.program-card');
            const details = programCard.querySelector('.program-details');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            button.setAttribute('aria-expanded', !isExpanded);
            details.style.maxHeight = isExpanded ? '0' : `${details.scrollHeight}px`;
            programCard.classList.toggle('expanded');
        });
    });

    // Dynamic Booking Calendar
    const calendarContainer = document.querySelector('.booking-calendar');
    
    function generateCalendar() {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        let calendarHTML = `
            <div class="calendar-header">
                <h4>${today.toLocaleString('default', { month: 'long' })} ${year}</h4>
            </div>
            <div class="calendar-grid">
        `;

        // Generate calendar days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isAvailable = date.getDay() !== 0 && day % 3 !== 0; // Sample availability logic
            calendarHTML += `
                <div class="calendar-day ${isAvailable ? 'available' : 'booked'}" 
                     data-date="${year}-${month + 1}-${day}">
                    ${day}
                    ${isAvailable ? '<div class="availability-dot"></div>' : ''}
                </div>
            `;
        }

        calendarHTML += '</div>';
        calendarContainer.innerHTML = calendarHTML;

        // Add date selection handler
        document.querySelectorAll('.calendar-day.available').forEach(day => {
            day.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(d => 
                    d.classList.remove('selected'));
                day.classList.add('selected');
                document.querySelector('#booking-date').value = day.dataset.date;
            });
        });
    }

    generateCalendar();

    // Video Tour Modal
    const videoTourButton = document.querySelector('.hero-cta.secondary');
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/EXAMPLE" 
                frameborder="0" 
                allow="accelerometer; autoplay; encrypted-media; gyroscope" 
                allowfullscreen>
            </iframe>
        </div>
    `;
    document.body.appendChild(videoModal);

    videoTourButton.addEventListener('click', () => {
        videoModal.classList.add('active');
    });

    videoModal.querySelector('.modal-close').addEventListener('click', () => {
        videoModal.classList.remove('active');
    });

    // Smooth Scroll with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Booking Form Validation
    const bookingForm = document.querySelector('#retreat-booking');
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(bookingForm);
        let isValid = true;

        // Custom validation
        if (!formData.get('check-in')) {
            showFormMessage('Please select a check-in date', 'error');
            isValid = false;
        }

        if (isValid) {
            showFormMessage('Processing your reservation...', 'success');
            bookingForm.reset();
            // Simulate API call
            setTimeout(() => {
                showFormMessage('Reservation confirmed! We\'ll contact you shortly.', 'success');
            }, 2000);
        }
    });

    function showFormMessage(message, type) {
        const existingMessage = bookingForm.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        bookingForm.prepend(messageDiv);

        setTimeout(() => messageDiv.remove(), 5000);
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.program-card, .philosophy-content').forEach(el => {
        fadeObserver.observe(el);
    });
});