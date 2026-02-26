window.addEventListener("DOMContentLoaded", async () => {
  const supabase = window.supabase.createClient(
    "https://cqbmntbuekxmllunrade.supabase.co",
    "sb_publishable_0zerQRBHSQl0i29KO7oKGw_Uq3bOjXz",
  );

  // Session olish
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Login qilmagan bo‘lsa login sahifaga
    window.location.replace("/login.html");
    return;
  }

  // Role tekshirish
  const role = session.user.user_metadata?.role;

  if (role !== "admin") {
    alert("Sizda admin ruxsat yo‘q");
    window.location.replace("/");
    return;
  }

  // Hamma to‘g‘ri bo‘lsa sahifani ko‘rsat
  document.body.style.display = "block";

  // Log out
  document.querySelector(".log-out").addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.replace("/login.html");
  });
});
