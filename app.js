document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  const status = document.getElementById("status");

  btn.addEventListener("click", () => {
    status.textContent = "Button clicked! PWA is working 🎉";
  });
});
