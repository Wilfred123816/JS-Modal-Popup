// Modal Popup Implementation
class Modal {
    constructor() {
        // Get DOM elements
        this.modal = document.getElementById('modal');
        this.openBtn = document.getElementById('openBtn');
        this.closeBtn = document.getElementById('closeBtn');
        
        // Get all focusable elements inside modal
        this.focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        // Store first and last focusable elements for trapping
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
        
        // Store element that had focus before modal opened
        this.previouslyFocusedElement = null;
        
        // Initialize modal
        this.init();
    }
    
    init() {
        // Set up event listeners
        this.setupEventListeners();
        
        // Set initial ARIA attributes
        this.updateAriaAttributes();
    }
    
    setupEventListeners() {
        // Open modal button
        this.openBtn.addEventListener('click', () => this.open());
        
        // Close modal button
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Close modal when clicking outside (on overlay)
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('show')) {
                this.close();
            }
        });
        
        // Trap focus inside modal (Advanced feature)
        this.modal.addEventListener('keydown', (e) => {
            this.trapFocus(e);
        });
        
        // Handle Enter key on focused buttons (Bonus feature)
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.matches('button')) {
                // Allow Enter to work normally
                // We'll handle specific button actions if needed
                this.handleEnterOnButton(e.target);
            }
        });
        
        // Additional action buttons in modal
        const actionBtns = document.querySelectorAll('.modal-action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Show feedback for demo purposes
                this.showButtonFeedback(btn.textContent);
            });
        });
    }
    
    // Open modal with fade-in effect
    open() {
        // Store currently focused element
        this.previouslyFocusedElement = document.activeElement;
        
        // Show modal
        this.modal.classList.add('show');
        
        // Update ARIA attributes
        this.updateAriaAttributes();
        
        // Move focus to first focusable element in modal (Accessibility feature)
        setTimeout(() => {
            this.firstFocusableElement.focus();
        }, 100);
        
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal with fade-out effect
    close() {
        // Hide modal
        this.modal.classList.remove('show');
        
        // Update ARIA attributes
        this.updateAriaAttributes();
        
        // Return focus to previously focused element (Accessibility feature)
        if (this.previouslyFocusedElement) {
            setTimeout(() => {
                this.previouslyFocusedElement.focus();
            }, 100);
        }
        
        // Restore scrolling on body
        document.body.style.overflow = 'auto';
    }
    
    // Trap focus inside modal (Advanced accessibility feature)
    trapFocus(e) {
        // Only handle Tab key when modal is open
        if (e.key !== 'Tab' || !this.modal.classList.contains('show')) {
            return;
        }
        
        // If Shift + Tab is pressed on first focusable element
        if (e.shiftKey) {
            if (document.activeElement === this.firstFocusableElement) {
                e.preventDefault();
                this.lastFocusableElement.focus();
            }
        } 
        // If Tab is pressed on last focusable element
        else {
            if (document.activeElement === this.lastFocusableElement) {
                e.preventDefault();
                this.firstFocusableElement.focus();
            }
        }
    }
    
    // Handle Enter key on buttons (Bonus feature)
    handleEnterOnButton(button) {
        // For demo purposes, show which button was activated
        console.log(`Enter key pressed on: ${button.textContent}`);
        
        // If it's the close button or cancel button, close modal
        if (button === this.closeBtn || button.id === 'actionBtn3') {
            this.close();
        }
        
        // You could add specific actions for other buttons here
    }
    
    // Update ARIA attributes for accessibility
    updateAriaAttributes() {
        const isOpen = this.modal.classList.contains('show');
        
        // Set aria-hidden on modal
        this.modal.setAttribute('aria-hidden', !isOpen);
        
        // Set aria-hidden on main content when modal is open
        const mainContent = document.querySelector('.container');
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', isOpen);
        }
        
        // Update open button label
        this.openBtn.setAttribute('aria-expanded', isOpen);
    }
    
    // Show feedback for button clicks (for demo)
    showButtonFeedback(buttonText) {
        // Create feedback element
        let feedback = document.createElement('div');
        feedback.className = 'button-feedback';
        feedback.textContent = `Clicked: ${buttonText}`;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        
        // Add to page
        document.body.appendChild(feedback);
        
        // Remove after 2 seconds
        setTimeout(() => {
            feedback.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 2000);
    }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.modal = new Modal();
    
    // Add CSS for feedback animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            to { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(style);
});