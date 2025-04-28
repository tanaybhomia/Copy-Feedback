(function () {
  let lastToast = null;

  document.addEventListener("copy", (e) => {
    // Check if there's actually text selected
    const selectedText = window.getSelection().toString();
    if (!selectedText || selectedText.trim() === "") return;

    if (lastToast) lastToast.remove();

    // Create toast element
    const toast = document.createElement("div");
    toast.id = "zen-copy-toast";
    toast.textContent = "Text has been copied to clipboard";

    document.body.appendChild(toast);
    lastToast = toast;

    // Trigger fade-in + scale-in
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "scale(1)";
    });

    // After 2 seconds, fade out + scale down
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "scale(0.8)";

      toast.addEventListener(
        "transitionend",
        () => {
          toast.remove();
          lastToast = null;
        },
        { once: true },
      );
    }, 3000);
  });

  // Optional: Add stylesheet to document for class-based animations
  const style = document.createElement("style");
  style.textContent = `
    #zen-copy-toast.show {
      opacity: 1 !important;
      transform: scale(1) !important;
    }
  `;
  document.head.appendChild(style);
})();
