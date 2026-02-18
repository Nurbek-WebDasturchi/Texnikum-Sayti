window.addEventListener("DOMContentLoaded", () => {
  // chrome extension
      chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.action === "getData") {
        fetch('https://api.example.com/data')
          .then(response => response.json())
          .then(data => sendResponse({ data: data }))
          .catch(error => sendResponse({ error: error.message }));
        return true; // Important: Indicates that sendResponse will be called asynchronously.
      }
    });
    // chrome extension
  const textArea = document.querySelector("textarea"),
    buttonsParent = document.querySelector(".buttons"),
    buttonEl = document.querySelectorAll(".form-btn");
  textArea.addEventListener("input", () => {
    if (textArea.value.trim() !== "") {
      buttonEl.forEach((btn) => btn.classList.remove("hide"));
      buttonsParent.classList.remove("hide");
    } else {
      buttonEl.forEach((btn) => btn.classList.add("hide"));
      buttonsParent.classList.add("hide");
    }
  });
  // Clearing detection
  const currentMessage = textArea.value.trim();
  if (currentMessage === "") {
    buttonEl.forEach((btn) => btn.classList.add("hide"));
    buttonsParent.classList.add("hide");
  } else {
    buttonEl.forEach((btn) => btn.classList.remove("hide"));
    buttonsParent.classList.remove("hide");
  }
  const applyBtn = document.querySelector(".apply-button");
  // Modal for more info on faculties
  const infoBtns = document.querySelectorAll(".info-btn"),
    moreInfoBox = document.querySelector(".more-info"),
    modalTitle = document.querySelector(".modal-title"),
    modalImg = document.querySelector(".modal-img"),
    modalDescription = document.querySelector(".modal-description"),
    applicationForm = document.querySelector(".application"),
    applicationBtn = document.querySelector(".application-btn");
  infoBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      applicationForm.classList.add("hide");
      moreInfoBox.classList.remove("hide");
      modalTitle.textContent = btn.dataset.title;
      modalImg.src = btn.dataset.img;
      modalDescription.innerHTML = btn.dataset.desc;
    });
  });
  function applying(button) {
    button.addEventListener("click", () => {
      moreInfoBox.classList.add("hide");
      applicationForm.classList.remove("hide");
    });
  }
  applying(applyBtn);
  applying(applicationBtn);

  // Navbar scroll active
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "main";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});
