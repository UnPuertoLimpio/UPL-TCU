document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const message = document.getElementById("message");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        message.style.color = "green";
        message.textContent = "¡Inicio de sesión exitoso!";

        setTimeout(() => {
          window.location.href = "adminEventos.html"; // Página protegida
        }, 1000);
      })
.catch(() => {
  message.style.color = "red";
  message.textContent = "No se pudo iniciar sesion. Verifica tus credenciales y vuelve a intentarlo.";
  // Optionally, you can log the error for debugging:
  // console.error(error);
  });
});
});
