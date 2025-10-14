// cursor.js

// Grab cursor elements
const cursor = document.querySelector('.cursor');
const cursorBig = document.querySelector('.cursor__ball--big');
const cursorSmall = document.querySelector('.cursor__ball--small');

let mouseX = 0, mouseY = 0; // actual mouse position
let posX = 0, posY = 0;     // big ball position (for lag)

// Track mouse movement
document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Small ball snaps immediately
  cursorSmall.style.left = mouseX + 'px';
  cursorSmall.style.top = mouseY + 'px';
});

// Animate big ball with lag
function animate() {
  posX += (mouseX - posX) * 0.15; // lag factor
  posY += (mouseY - posY) * 0.15;

  cursorBig.style.left = posX + 'px';
  cursorBig.style.top = posY + 'px';

  requestAnimationFrame(animate);
}
animate();

// Optional: hover effect for .hoverable elements
document.querySelectorAll('.hoverable').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});
