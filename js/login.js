window.addEventListener("DOMContentLoaded", () => {
  const supabase = window.supabase.createClient(
    "https://cqbmntbuekxmllunrade.supabase.co",
    "sb_publishable_0zerQRBHSQl0i29KO7oKGw_Uq3bOjXz",
  );

  document.querySelector(".login-btn").addEventListener("click", async (e) => {
    e.preventDefault();
    document.querySelector(".loader").classList.remove("hide");
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Email va parolni kiriting.");
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
