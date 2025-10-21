document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".coverflow-item");
  const container = document.querySelector(".coverflow-carousel");
  let activeIndex = 1;
  let autoRotate;

  function updateCoverflow() {
    items.forEach((item, i) => {
      item.classList.remove("prev", "next", "active", "far");

      if (i === activeIndex) {
        item.classList.add("active");
      } else if (i === (activeIndex - 1 + items.length) % items.length) {
        item.classList.add("prev");
      } else if (i === (activeIndex + 1) % items.length) {
        item.classList.add("next");
      } else {
        item.classList.add("far");
      }
    });
  }

  // Initial setup
  updateCoverflow();

  // Scroll to rotate
  container.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      activeIndex = (activeIndex + 1) % items.length;
    } else {
      activeIndex = (activeIndex - 1 + items.length) % items.length;
    }
    updateCoverflow();
  });

  // Auto-rotate
  function startAutoRotate() {
    autoRotate = setInterval(() => {
      activeIndex = (activeIndex + 1) % items.length;
      updateCoverflow();
    }, 8000);
  }

  function stopAutoRotate() {
    clearInterval(autoRotate);
  }

  container.addEventListener("mouseenter", stopAutoRotate);
  container.addEventListener("mouseleave", startAutoRotate);

  // 🔁 Recalculate layout on resize
  window.addEventListener("resize", () => {
    updateCoverflow();
  });

  startAutoRotate();
});
