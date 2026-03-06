// js/admin.js
window.addEventListener("DOMContentLoaded", async () => {
  const SUPABASE_URL = "https://cqbmntbuekxmllunrade.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_0zerQRBHSQl0i29KO7oKGw_Uq3bOjXz";

  // Supabase kutubxonasi sahifada yuklangan bo'lishi kerak:
  if (!window.supabase) {
    console.error(
      'Supabase library not found. Include <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script> before this file.',
    );
    return;
  }

  // Yagona global client yaratish (agar hali yaratilmagan bo'lsa)
  if (!window.supabaseClient) {
    window.supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
    );
  }
  const supabase = window.supabaseClient;

  // Session olish va role tekshirish
  const { data: { session } = {} } = await supabase.auth.getSession();
  console.log(`mana: ${session}`);
  if (!session) {
    window.location.replace("/login.html");
    return;
  }

  const role = session.user.user_metadata?.role;
  if (role !== "admin") {
    alert("Sizda admin ruxsat yo‘q");
    window.location.replace("/");
    return;
  }

  // Hamma to'g'ri bo'lsa sahifani ko'rsatish
  document.body.style.display = "block";

  // Log out tugmasi
  const logoutBtn = document.querySelector(".log-out");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await supabase.auth.signOut();
      window.location.replace("/login.html");
    });
  }
});
