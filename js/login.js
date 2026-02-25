window.addEventListener("DOMContentLoaded", () => {
  const supabase = window.supabase.createClient(
    "https://cqbmntbuekxmllunrade.supabase.co",
    "sb_publishable_0zerQRBHSQl0i29KO7oKGw_Uq3bOjXz",
  );

  const btn = document.querySelector(".login-btn");
  async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login xato");
    } else {
      window.location.href = "/admin";
    }
  }
  btn.addEventListener("click", () => {
    login();
  });
});
