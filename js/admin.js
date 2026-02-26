window.addEventListener("DOMContentLoaded", async () => {
  const supabase = window.supabase.createClient(
    "https://cqbmntbuekxmllunrade.supabase.co",
    "sb_publishable_0zerQRBHSQl0i29KO7oKGw_Uq3bOjXz",
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.replace("/login.html");
    return;
  }

  const role = session.user.user_metadata?.role;

  if (role !== "admin") {
    window.location.replace("/");
    return;
  }

  document.body.style.display = "block";

  document.querySelector(".log-out").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.replace("/login.html");
  });
});
