// ============================
// Infinite Adaptive Carousel
// ============================

const carouselItems = Array.from(document.querySelectorAll(".carousel-item"));
let current = 0;

// --- Initialize carousel ---
function updateCarousel() {
  const total = carouselItems.length;

  // Reset states
  carouselItems.forEach(item =>
    item.classList.remove("prev", "next", "active", "hidden")
  );

  // Calculate index references
  const prevIndex = (current - 1 + total) % total;
  const nextIndex = (current + 1) % total;

  // Apply core classes
  carouselItems[current].classList.add("active");
  carouselItems[prevIndex].classList.add("prev");
  carouselItems[nextIndex].classList.add("next");

  // Hide everything else
  carouselItems.forEach((item, i) => {
    if (![current, prevIndex, nextIndex].includes(i)) {
      item.classList.add("hidden");
    }
  });

  // Update adaptive text color for active item
  updateTextContrast();
}

// --- Navigation logic ---
function goNext() {
  current = (current + 1) % carouselItems.length;
  updateCarousel();
}

function goPrev() {
  current = (current - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

// --- Click navigation ---
carouselItems.forEach(item => {
  item.addEventListener("click", () => {
    if (item.classList.contains("next")) goNext();
    if (item.classList.contains("prev")) goPrev();
  });
});

// --- Optional auto rotation ---
// const autoRotate = setInterval(goNext, 5000);

updateCarousel();

// Function to calculate average brightness of card images
function getAverageBrightness(imgElement, callback) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imgElement.src;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    let r, g, b, avg;
    let colorSum = 0;

    for (let x = 0, len = data.length; x < len; x += 4) {
      r = data[x];
      g = data[x + 1];
      b = data[x + 2];
      avg = Math.floor((r + g + b) / 3);
      colorSum += avg;
    }

    const brightness = Math.floor(colorSum / (img.width * img.height));
    callback(brightness);
  };
}

// Function to apply adaptive text color based on brightness
function updateTextContrast() {
  const activeItem = document.querySelector(".carousel-item.active");
  if (!activeItem) return;

  const img = activeItem.querySelector("img");
  const info = activeItem.querySelector(".item-info");

  getAverageBrightness(img, (brightness) => {
    if (brightness > 130) {
      info.classList.remove("light-text");
      info.classList.add("dark-text");
    } else {
      info.classList.remove("dark-text");
      info.classList.add("light-text");
    }
  });
}

// Run this whenever the carousel updates
setInterval(updateTextContrast, 1000);
