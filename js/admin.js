window.addEventListener("DOMContentLoaded", () => {
  const logOutBtn = document.querySelector(".log-out");
  const supabase = window.supabase.createClient(
    "https://cqbmntbuekxmllunrade.supabase.co",
    "sb_publishable_0zerQRBHSQl0i29KO7oKGw_Uq3bOjXz",
  );
  async function checkUser() {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      window.location.href = "/login.html";
    }
  }
  checkUser();
  async function logOut() {
    await supabase.auth.signOut();
    window.location.href = "/login.html";
  }
  logOutBtn.addEventListener("click", () => {
    logOut();
  });
});
