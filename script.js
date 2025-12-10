document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;        // index page: no gallery/lightbox

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  // open on image click
  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.classList.add("show");
    });
  });

  // close events
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("show");
    }
  });
});
