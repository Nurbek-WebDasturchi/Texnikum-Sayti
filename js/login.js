window.addEventListener("DOMContentLoaded", () => {
  const supabase = window.supabase.createClient(
    "https://cqbmntbuekxmllunrade.supabase.co",
    "sb_publishable_0zerQRBHSQl0i29KO7oKGw_Uq3bOjXz",
  );
  const wrapper = document.querySelector(".loader");
  document.querySelector(".login-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    if (email || password) {
      wrapper.classList.remove("hide");
    }
    if (!email || !password) {
      alert("Email va parolni kiriting.");
      wrapper.classList.add("hide");

      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login xato: " + error.message);
      return;
    }

    // Agar kerak bo'lsa sessiyani yana tekshirish:
    // await supabase.auth.getSession();

    // Redirect immediately
    window.location.href = "/admin.html";
  });
});
