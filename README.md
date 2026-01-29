JS Modal Popup

A clean, accessible modal popup implementation with focus on core functionality and bonus features.

Features Implemented

Core Requirements
- ✅ Open modal with button click
- ✅ Close modal with close button (×)
- ✅ Close modal by clicking outside (overlay)
- ✅ Close modal with Escape key

Bonus Challenges (Level Up)
- ✅ Fade-in / fade-out effect using CSS transitions
- ✅ Move focus to modal when it opens (accessibility)
- ✅ Trap focus inside modal (advanced accessibility)
- ✅ Close modal with Enter key when a button is focused

How to Use

1. Open Modal: Click the "Open Modal Popup" button
2. Close Modal: Multiple ways:
   - Click the × button
   - Click outside the modal (on the overlay)
   - Press Escape key
   - Press Enter key when a button is focused
3. Keyboard Navigation:
   - `Tab` / `Shift+Tab`: Navigate between focusable elements
   - `Enter`: Activate focused button
   - `Esc`: Close modal

 Accessibility Features

- Focus Management: Focus moves to modal when opened, returns to original element when closed
- Focus Trapping: Tab key stays inside modal when it's open
- ARIA Attributes: Proper roles and labels for screen readers
- Keyboard Support: Full keyboard navigation support

## Implementation Details

### HTML Structure
```html
<div id="modal" class="modal-overlay">
  <div class="modal-box" role="dialog">
    <button id="closeBtn" class="modal-close">×</button>
    <!-- Modal content -->
  </div>
</div>

CSS Transitions

.modal-overlay {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal-overlay.show {
  opacity: 1;
  visibility: visible;
}

 JavaScript Focus Management

// Store previous focus
this.previouslyFocusedElement = document.activeElement;

// Move focus to modal
this.firstFocusableElement.focus();

// Return focus when closed
this.previouslyFocusedElement.focus();

Focus Trapping

trapFocus(e) {
  if (e.key === 'Tab') {
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
}


Live Demo

https://wilfred123816.github.io/JS-Modal-Popup/

Browser Support

Chrome 60+

Firefox 55+

Safari 11+

Edge 79+

License

MIT License - Feel free to use this code in your projects.
