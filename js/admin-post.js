// Debug va barqaror post handler
window.addEventListener("DOMContentLoaded", () => {
  console.log("admin-post.js loaded");

  // Supabase client tekshiruvi
  const supabase = window.supabaseClient;
  if (!supabase) {
    console.error(
      "supabaseClient topilmadi. Iltimos /js/admin.js sahifada to'g'ri yuklanganligini tekshiring.",
    );
    return;
  }
  console.log("supabaseClient OK");

  const form = document.getElementById("post-form");
  if (!form) {
    console.error("post-form elementi topilmadi!");
    return;
  }
  console.log("post-form topildi:", form);

  // Tugma tekshiruvi (uzoqcha izlash)
  const submitBtn =
    form.querySelector('button[type="submit"]') ||
    form.querySelector(".btn-primary");
  console.log("submit button:", submitBtn);

  if (submitBtn) {
    submitBtn.addEventListener("click", (ev) => {
      console.log("Submit button clicked", ev);
      // Bu yerda tugma bosilgani haqida log bo'ladi — lekin form submit ishlashi uchun form handler ham ishga tushishi kerak
    });
  }

  // Asosiy submit handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("form submit handler started");

    try {
      const titleEl = document.getElementById("title");
      const descEl = document.getElementById("description");
      const imageEl = document.getElementById("image");

      if (!titleEl || !descEl || !imageEl) {
        const msg =
          "Form ichidagi elementlar topilmadi (title/description/image).";
        console.error(msg);
        alert(msg);
        return;
      }

      const title = titleEl.value.trim();
      const description = descEl.value.trim();
      const imageFile = imageEl.files[0];

      console.log("Form values:", { title, description, hasFile: !!imageFile });

      if (!title || !description) {
        alert("Sarlavha va description to'ldiring.");
        return;
      }
      if (!imageFile) {
        alert("Rasm tanlang!");
        return;
      }

      // Foydalanuvchi va sessiyani tekshirish
      const sessionRes = await supabase.auth.getSession();
      console.log("getSession()", sessionRes);
      const userRes = await supabase.auth.getUser();
      console.log("getUser()", userRes);
      const user = userRes?.data?.user;
      console.log("user object:", user);

      if (!user) {
        alert("Avval tizimga kiring!");
        return;
      }

      // File nomini local scope ichida e'lon qilish
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      console.log("Generated fileName:", fileName);

      // Yuklash
      const uploadResult = await supabase.storage
        .from("posts-images")
        .upload(fileName, imageFile);
      console.log("uploadResult:", uploadResult);
      if (uploadResult.error) {
        throw uploadResult.error;
      }

      // Public yoki signed URL olish
      const publicRes = supabase.storage
        .from("posts-images")
        .getPublicUrl(fileName);
      console.log("getPublicUrl()", publicRes);
      let imageUrl = publicRes?.data?.publicUrl;

      if (!imageUrl) {
        const signedRes = await supabase.storage
          .from("posts-images")
          .createSignedUrl(fileName, 60 * 60);
        console.log("createSignedUrl()", signedRes);
        if (signedRes.error) throw signedRes.error;
        imageUrl = signedRes.data.signedUrl;
      }
      console.log("final imageUrl:", imageUrl);

      // INSERT payload
      const insertPayload = {
        title,
        description,
        image_url: imageUrl,
        user_id: user.id,
      };
      console.log("Insert payload:", insertPayload);

      const { data, error: postError } = await supabase
        .from("posts")
        .insert([insertPayload]);
      console.log("Insert result:", { data, postError });

      if (postError) {
        throw postError;
      }

      alert("Post muvaffaqiyatli qo'shildi!");
      form.reset();
    } catch (err) {
      console.error("Submit handler xatolik:", err);
      // Ba'zan Supabase error obyekti ichida message bo'lmasligi mumkin, shuning uchun barcha qatorlarni ko'rsatamiz
      const msg =
        err?.message || (typeof err === "string" ? err : JSON.stringify(err));
      alert("Xatolik: " + msg);
    }
  });
});
