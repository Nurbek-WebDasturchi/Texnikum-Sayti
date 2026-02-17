window.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".rate-container");

  containers.forEach((container, index) => {
    const storageKey = `rate-state-${index}`;
    const boxes = container.querySelectorAll(".rate-box");

    // ===== INIT (localStorage dan o‘qish)
    const savedState = JSON.parse(localStorage.getItem(storageKey));

    if (savedState) {
      boxes.forEach((box, i) => {
        const icon = box.querySelector(".rate-icon");
        const count = box.querySelector(".count");

        count.textContent = savedState.counts[i];

        if (savedState.activeIndex === i) {
          icon.classList.remove("fa-regular");
          icon.classList.add("fa-solid", "text-primary");
        }
      });
    }

    // ===== CLICK
    boxes.forEach((box, clickedIndex) => {
      const icon = box.querySelector(".rate-icon");
      const count = box.querySelector(".count");

      icon.addEventListener("click", () => {
        let state = {
          activeIndex: null,
          counts: [],
        };

        boxes.forEach((b, i) => {
          const bIcon = b.querySelector(".rate-icon");
          const bCount = b.querySelector(".count");
          let value = parseInt(bCount.textContent, 10);

          if (i === clickedIndex) {
            if (bIcon.classList.contains("fa-regular")) {
              bIcon.classList.remove("fa-regular");
              bIcon.classList.add("fa-solid", "text-primary");
              value++;
              state.activeIndex = i;
            } else {
              bIcon.classList.remove("fa-solid", "text-primary");
              bIcon.classList.add("fa-regular");
              value--;
              state.activeIndex = null;
            }
          } else {
            if (bIcon.classList.contains("fa-solid")) {
              bIcon.classList.remove("fa-solid", "text-primary");
              bIcon.classList.add("fa-regular");
              value--;
            }
          }

          bCount.textContent = value;
          state.counts[i] = value;
        });

        localStorage.setItem(storageKey, JSON.stringify(state));
      });
    });
  });
});
