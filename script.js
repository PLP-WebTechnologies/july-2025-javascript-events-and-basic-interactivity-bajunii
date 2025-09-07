// ===================================================================
// INTERACTIVE WEB PAGE WITH JAVASCRIPT EVENTS AND FORM VALIDATION
// ===================================================================

// Wait for DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Interactive Web Page Loaded!');
    
    // Initialize all interactive features
    initializeDarkModeToggle();
    initializeCounterGame();
    initializeCollapsibleFAQ();
    initializeTabbedInterface();
    initializeFormValidation();
    initializeHoverEffects();
});

// ===================================================================
// PART 1: DARK MODE TOGGLE - Event Handling & DOM Manipulation
// ===================================================================

function initializeDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️ Light Mode';
    }
    
    // Add click event listener for dark mode toggle
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Update button text and save preference
        if (body.classList.contains('dark-mode')) {
            darkModeToggle.textContent = '☀️ Light Mode';
            localStorage.setItem('darkMode', 'true');
        } else {
            darkModeToggle.textContent = '🌙 Dark Mode';
            localStorage.setItem('darkMode', 'false');
        }
        
        console.log('Dark mode toggled!');
    });
}

// ===================================================================
// PART 2: INTERACTIVE COUNTER GAME - Multiple Event Types
// ===================================================================

function initializeCounterGame() {
    const counterValue = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    const counterMessage = document.getElementById('counterMessage');
    
    let count = 0;
    
    // Function to update counter display and show messages
    function updateCounter() {
        counterValue.textContent = count;
        
        // Show different messages based on count value
        if (count === 0) {
            counterMessage.textContent = 'Starting fresh! 🆕';
            counterMessage.className = 'message neutral';
        } else if (count > 0 && count <= 5) {
            counterMessage.textContent = 'Looking good! 👍';
            counterMessage.className = 'message positive';
        } else if (count > 5) {
            counterMessage.textContent = 'You\'re on fire! 🔥';
            counterMessage.className = 'message excellent';
        } else if (count < 0) {
            counterMessage.textContent = 'Going negative! 📉';
            counterMessage.className = 'message negative';
        }
    }
    
    // Event listeners for counter buttons
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounter();
        console.log('Counter incremented to:', count);
    });
    
    decrementBtn.addEventListener('click', function() {
        count--;
        updateCounter();
        console.log('Counter decremented to:', count);
    });
    
    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
        console.log('Counter reset to 0');
    });
    
    // Add keyboard shortcuts for counter (bonus feature)
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'ArrowUp') {
            event.preventDefault();
            count++;
            updateCounter();
            console.log('Counter incremented via keyboard shortcut');
        } else if (event.ctrlKey && event.key === 'ArrowDown') {
            event.preventDefault();
            count--;
            updateCounter();
            console.log('Counter decremented via keyboard shortcut');
        } else if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            count = 0;
            updateCounter();
            console.log('Counter reset via keyboard shortcut');
        }
    });
    
    // Initialize counter display
    updateCounter();
}

// ===================================================================
// PART 2: COLLAPSIBLE FAQ SECTION - Toggle & Animation
// ===================================================================

function initializeCollapsibleFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isOpen = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(function(otherQuestion) {
                const otherItem = otherQuestion.parentElement;
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            if (isOpen) {
                faqItem.classList.remove('active');
                console.log('FAQ closed:', this.textContent);
            } else {
                faqItem.classList.add('active');
                console.log('FAQ opened:', this.textContent);
            }
        });
    });
}

// ===================================================================
// PART 2: TABBED INTERFACE - Dynamic Content Switching
// ===================================================================

function initializeTabbedInterface() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            console.log('Switched to tab:', targetTab);
        });
    });
}

// ===================================================================
// PART 3: COMPREHENSIVE FORM VALIDATION - Custom Logic & Regex
// ===================================================================

function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation for each input field
    inputs.forEach(function(input) {
        // Validate on blur (when user leaves the field)
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Real-time validation for password strength
        if (input.id === 'password') {
            input.addEventListener('input', function() {
                updatePasswordStrength(this.value);
            });
        }
        
        // Clear error messages when user starts typing
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Form submission with comprehensive validation
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        let isFormValid = true;
        
        // Validate all fields
        inputs.forEach(function(input) {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        // Show form result
        const formMessage = document.getElementById('formMessage');
        if (isFormValid) {
            formMessage.innerHTML = '✅ <strong>Success!</strong> Your message has been sent successfully!';
            formMessage.className = 'form-message success';
            form.reset(); // Clear form
            updatePasswordStrength(''); // Reset password strength
            console.log('Form submitted successfully!');
        } else {
            formMessage.innerHTML = '❌ <strong>Error!</strong> Please fix the errors above and try again.';
            formMessage.className = 'form-message error';
            console.log('Form submission failed due to validation errors');
        }
    });
}

// Validate individual form fields with custom logic
function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Field-specific validation rules
    switch (fieldId) {
        case 'fullName':
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                errorMessage = 'Name can only contain letters, spaces, apostrophes, and hyphens';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'phone':
            if (value && !/^\+?[\d\s-()]{10,}$/.test(value)) {
                errorMessage = 'Please enter a valid phone number (optional)';
                isValid = false;
            }
            break;
            
        case 'password':
            if (value.length < 8) {
                errorMessage = 'Password must be at least 8 characters long';
                isValid = false;
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                errorMessage = 'Password must contain uppercase, lowercase, and number';
                isValid = false;
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters long';
                isValid = false;
            } else if (value.length > 500) {
                errorMessage = 'Message must be less than 500 characters';
                isValid = false;
            }
            break;
    }
    
    // Display error message
    const errorElement = document.getElementById(fieldId.replace(/([A-Z])/g, '') + 'Error');
    if (!isValid) {
        errorElement.textContent = errorMessage;
        field.classList.add('error');
    } else {
        errorElement.textContent = '';
        field.classList.remove('error');
    }
    
    return isValid;
}

// Clear error styling and messages when user starts typing
function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.id.replace(/([A-Z])/g, '') + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Real-time password strength indicator
function updatePasswordStrength(password) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthLevel = document.getElementById('strengthLevel');
    
    let strength = 0;
    let strengthText = 'Weak';
    let strengthColor = '#ff4757';
    
    // Calculate password strength
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    // Update strength display
    switch (strength) {
        case 0:
        case 1:
            strengthText = 'Weak';
            strengthColor = '#ff4757';
            break;
        case 2:
        case 3:
            strengthText = 'Medium';
            strengthColor = '#ffa502';
            break;
        case 4:
            strengthText = 'Strong';
            strengthColor = '#2ed573';
            break;
        case 5:
            strengthText = 'Very Strong';
            strengthColor = '#1e90ff';
            break;
    }
    
    strengthLevel.textContent = strengthText;
    strengthBar.style.width = (strength * 20) + '%';
    strengthBar.style.backgroundColor = strengthColor;
}

// ===================================================================
// PART 1: ADVANCED HOVER & MOUSE EFFECTS
// ===================================================================

function initializeHoverEffects() {
    const hoverCards = document.querySelectorAll('.hover-card');
    
    hoverCards.forEach(function(card, index) {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            console.log('Mouse entered card:', index + 1);
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            console.log('Mouse left card:', index + 1);
        });
        
        // Mouse down effect (for second card)
        if (index === 1) {
            card.addEventListener('mousedown', function() {
                this.style.backgroundColor = '#ff6b6b';
                this.style.color = 'white';
                console.log('Mouse down on card 2');
            });
            
            card.addEventListener('mouseup', function() {
                this.style.backgroundColor = '';
                this.style.color = '';
                console.log('Mouse up on card 2');
            });
        }
        
        // Double click effect (for third card)
        if (index === 2) {
            card.addEventListener('dblclick', function() {
                this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)';
                this.style.color = 'white';
                this.innerHTML = '<h3>🎉 Surprise!</h3><p>You discovered the double-click effect!</p>';
                
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                    this.innerHTML = '<h3>Double Click!</h3><p>Double-click for a surprise</p>';
                }, 3000);
                
                console.log('Double click detected on card 3');
            });
        }
    });
    
    // Global keyboard event listener for additional interactivity
    document.addEventListener('keydown', function(event) {
        // Show help message when user presses 'H'
        if (event.key.toLowerCase() === 'h') {
            alert('🎮 Keyboard Shortcuts:\n\n' +
                  '• Ctrl + ↑/↓ : Increment/Decrement counter\n' +
                  '• Ctrl + R : Reset counter\n' +
                  '• H : Show this help\n' +
                  '• ESC : Close any open FAQ');
        }
        
        // Close FAQ items when ESC is pressed
        if (event.key === 'Escape') {
            const activeFAQ = document.querySelector('.faq-item.active');
            if (activeFAQ) {
                activeFAQ.classList.remove('active');
                console.log('FAQ closed with ESC key');
            }
        }
    });
    
    console.log('All interactive features initialized successfully! 🎉');
}
