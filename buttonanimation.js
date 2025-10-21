// buttonanimation.js

// Optional: hover effects on .hoverable elements
document.querySelectorAll('.hoverable').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// Add a simple helloworld function for testing
function helloworld() {
  console.log('Hello, world!');
}
// Expose to window for easy debugging from the console
window.helloworld = helloworld;