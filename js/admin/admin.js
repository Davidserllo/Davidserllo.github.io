// Función para iniciar sesión
function login(event) {
    event.preventDefault();

    const username = document.getElementById('InputUsername').value;
    const password = document.getElementById('InputPassword').value;
    const loginError = document.getElementById('loginError');

    if (!username || !password) {
        loginError.innerText = "Por favor, completa todos los campos.";
        return;
    }

    // Autenticación con Firebase
    firebase.auth().signInWithEmailAndPassword(username, password)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            const user = userCredential.user;
            console.log(`Bienvenido: ${user.email}`);

            // Guardar estado de sesión
            localStorage.setItem('loggedIn', true);

            // Redirigir a la página de administración
            window.location.href = "admin.html";
        })
        .catch((error) => {
            // Manejo de errores
            console.error("Error de inicio de sesión:", error);
            if (error.code === 'auth/wrong-password') {
                loginError.innerText = "Contraseña incorrecta.";
            } else if (error.code === 'auth/user-not-found') {
                loginError.innerText = "Usuario no encontrado.";
            } else {
                loginError.innerText = "Error al iniciar sesión. Intenta más tarde.";
            }
        });
}
