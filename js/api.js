window.addEventListener("DOMContentLoaded", () => {
  // FORM ELEMENTS
  const parentEl = document.querySelector(".modal"),
    alertMsg = document.createElement("div");
  alertMsg.classList.add("alert");

  // Comment API
  const form = document.querySelector("#form"),
    textArea = document.querySelector("#comment-area"),
    commentBotToken = "7983159904:AAHWS_xpPALZcmppP3wAMHMKFFrYoWW7fhs",
    id = "6401123819";
  // ===== Enter bosilganda form submit qilish =====
  textArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // yangi qator hosil bo‘lishini oldini oladi
      form.requestSubmit(); // form submit qiladi
    }
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = textArea.value.trim();
    if (message !== "") {
      fetch(`https://api.telegram.org/bot${commentBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: id,
          text: `Foydalanuvchi fikri: "${message}"`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok) {
            textArea.value = "";
          } else {
            alert(`Nimadir xato ketdi, qaytadan urinib ko'ring.`);
          }
        })
        .catch((error) => {
          console.log("Nimadir xato ketdi", error);
          alert("Nimadir xato ketdi.");
        })
        .finally(() => {
          console.log("API ishlayaptiku hech bolmaganda.");
        });
    } else {
      console.log("Foydalanuvchi hali hech narsa yozmagan kommentga");
    }
  });
  // Clearing textArea
  const clearBtn = document.querySelector("#clear-btn");
  clearBtn.addEventListener("click", () => {
    const currentMessage = textArea.value.trim();
    if (currentMessage !== "") {
      textArea.value = "";
    } else {
      console.log(
        "Nimani tozalashga urinyapsan, shunchaki textAreaga nimadir yoz va keyin bos tozlalashni!",
      );
    }
  });
  // /Comment API
  // Application-requesting API
  // Application modal
  const sendRequestForm = document.querySelector(".application-form"),
    closeBtn = document.querySelector("#close-application");
  // API TOKENS
  const adminstrationBotToken =
    "8512933150:AAEwzX_WZ1GQSu0F6e_bGJZSbr3w_G4WYvU";
  const chat_id_dev = "6401123819";
  const chat_id_admin = "";
  const chat_id_teacher = "";

  // API SUBMIT
  sendRequestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(sendRequestForm),
      userName = formData.get("name"),
      userSurname = formData.get("surname"),
      userPhoneNumber = formData.get("phone-number");
    const values = [userName, userSurname, userPhoneNumber];
    const dataInputs = `ISM:${userName},
    FAMILYA: ${userSurname},
    TELEFON: ${userPhoneNumber}
    `;
    if (values.some((value) => value.trim() !== "")) {
      if (userName !== "" && userSurname !== "" && userPhoneNumber !== "") {
        fetch(
          `https://api.telegram.org/bot${adminstrationBotToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: chat_id_dev,
              text: dataInputs,
            }),
          },
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("Javob:", data);
            closeBtn.click();
          })
          .catch((err) => {
            console.error("Xatolik:", err);
          });
      } else {
        alertMsg.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show alert-content" role="alert">
          <strong>Hurmatli foydalanuvchi, formani to'liq to'ldiring</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
        parentEl.append(alertMsg);
        setTimeout(() => {
          alertMsg.remove();
        }, 5000);
      }
    } else {
      alertMsg.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show alert-content" role="alert">
          <strong>Hurmatli foydalanuvchi, siz formani to'ldirmadingiz hali!.</strong>
          <button type="button" class="alert-close" data-bs-dismiss="alert" aria-label="Close"><i class="bi bi-x-circle"></i></button>
        </div>
        `;
      parentEl.append(alertMsg);
      setTimeout(() => {
        alertMsg.remove();
      }, 5000);
    }
  });
});
