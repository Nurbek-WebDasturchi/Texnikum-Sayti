window.addEventListener("DOMContentLoaded", () => {
  const intro = document.querySelector("#intro"),
    post = document.querySelector("#post"),
    updates = document.querySelector("#updates"),
    software = document.querySelector("#software"),
    about = document.querySelector("#about"),
    statistics = document.querySelector("#statistics");
  // Buttons
  const btnPost = document.querySelector("#btn-post");
  const btnUpdates = document.querySelector("#btn-updates");
  const btnSoftware = document.querySelector("#btn-software");
  const btnAbout = document.querySelector("#btn-about");
  const btnStatistics = document.querySelector("#btn-statistics");

  function show(activeSection) {
    [intro, post, updates, software, about, statistics].forEach((section) => {
      section.classList.add("hide");
    });
    activeSection.classList.remove("hide");
  }
  // Event ishlashi
  btnPost.addEventListener("click", () => show(post));
  btnUpdates.addEventListener("click", () => show(updates));
  btnSoftware.addEventListener("click", () => show(software));
  btnAbout.addEventListener("click", () => show(about));
  btnStatistics.addEventListener("click", () => show(statistics));
});
