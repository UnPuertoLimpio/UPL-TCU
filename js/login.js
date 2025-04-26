document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  fetch("data/users.json")
    .then(response => response.json())
    .then(users => {
      const found = users.find(user => user.username === username && user.password === password);
      if (found) {
        message.style.color = "green";
        message.textContent = "¡Login exitoso!";
        // Redirigir al usuario a la página principal después de 1 segundo
        setTimeout(() => {
          window.location.href = "adminEventos.html";
        }, 1000);
      } else {
        message.style.color = "red";
        message.textContent = "Usuario o contraseña incorrectos.";
      }
    })
    .catch(err => {
      console.error("Error cargando el archivo JSON:", err);
      message.textContent = "Error de servidor.";
    });
});
