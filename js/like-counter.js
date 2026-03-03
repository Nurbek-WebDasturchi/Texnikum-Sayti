// like-counter.js (FINAL FIXED VERSION)

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("rate-icon")) return;

  const icon = e.target;
  const container = icon.closest(".rate-container");
  if (!container) return;

  const boxes = container.querySelectorAll(".rate-box");
  const postId = container.dataset.postId;
  const storageKey = `rate-state-${postId}`;

  // Hozirgi UI countlarni olish
  let currentCounts = Array.from(boxes).map(box =>
    parseInt(box.querySelector(".count").textContent, 10) || 0
  );

  // localStorage dan state olish
  let state = JSON.parse(localStorage.getItem(storageKey)) || {
    activeIndex: null,
    counts: currentCounts,
  };

  boxes.forEach((box, i) => {
    const bIcon = box.querySelector(".rate-icon");
    const bCount = box.querySelector(".count");
    let value = parseInt(bCount.textContent, 10) || 0;

    if (box.contains(icon)) {
      if (state.activeIndex === i) {
        // Bekor qilish
        bIcon.classList.remove("fa-solid", "text-primary");
        bIcon.classList.add("fa-regular");

        value = Math.max(0, value - 1); // 🔥 -1 fix
        state.activeIndex = null;
      } else {
        // Boshqa bosilgan bo‘lsa reset qilamiz
        boxes.forEach((otherBox, j) => {
          const oIcon = otherBox.querySelector(".rate-icon");
          const oCount = otherBox.querySelector(".count");

          if (j === i) {
            oIcon.classList.remove("fa-regular");
            oIcon.classList.add("fa-solid", "text-primary");

            value = value + 1;
            state.activeIndex = i;
          } else {
            if (oIcon.classList.contains("fa-solid")) {
              oIcon.classList.remove("fa-solid", "text-primary");
              oIcon.classList.add("fa-regular");

              oCount.textContent = Math.max(
                0,
                (parseInt(oCount.textContent, 10) || 0) - 1
              );
            }
          }
        });
      }
    }

    bCount.textContent = value;
    state.counts[i] = value;
  });

  localStorage.setItem(storageKey, JSON.stringify(state));
});


// ===== Sahifa yuklanganda restore =====
window.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".rate-container");

  containers.forEach(container => {
    const postId = container.dataset.postId;
    const storageKey = `rate-state-${postId}`;
    const savedState = JSON.parse(localStorage.getItem(storageKey));

    if (!savedState) return;

    const boxes = container.querySelectorAll(".rate-box");

    boxes.forEach((box, i) => {
      const icon = box.querySelector(".rate-icon");
      const count = box.querySelector(".count");

      count.textContent = savedState.counts?.[i] ?? 0;

      if (savedState.activeIndex === i) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid", "text-primary");
      } else {
        icon.classList.remove("fa-solid", "text-primary");
        icon.classList.add("fa-regular");
      }
    });
  });
});