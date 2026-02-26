window.addEventListener("DOMContentLoaded", () => {
  const supabase = window.supabase.createClient(
    "https://cqbmntbuekxmllunrade.supabase.co",
    "sb_publishable_0zerQRBHSQl0i29KO7oKGw_Uq3bOjXz",
  );

  document.querySelector(".login-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login xato");
      return;
    }

    // session saqlanishi uchun ozgina kutamiz
    setTimeout(() => {
      window.location.href = "/admin.html";
    }, 300);
  });
});
