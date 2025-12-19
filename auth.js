document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = form.querySelector('input[name="username"]').value.trim();
    const pass = form.querySelector('input[name="password"]').value.trim();

    // Simple client-side auth mock (no backend). Change or integrate backend later.
    if ((user === "admin" && pass === "admin123") || (user && pass)) {
      localStorage.setItem("Modes_Entertainment_user", user);
      alert("Login berhasil — sebagai: " + user);
      window.location.href = "index.html";
    } else {
      alert("Login gagal. Gunakan user: admin / admin123 atau masukkan kredensial valid.");
    }
  });
});
