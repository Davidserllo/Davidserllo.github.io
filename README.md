# Web de RecomFilm

## Descripción del Proyecto
Esta aplicación web complementa la funcionalidad de la aplicación móvil **RecomFilm**, proporcionando una plataforma para:
- Descargar la aplicación móvil.
- Gestionar la base de datos de películas y usuarios por parte de los administradores.
- Ofrecer información y noticias relevantes sobre el proyecto y el mundo del cine.

## Características principales
### Para administradores:
- **Gestión de películas:** Añadir, editar o eliminar películas en la base de datos.
- **Gestión de usuarios:** Administrar cuentas de los usuarios (crear, modificar o eliminar).

### Para visitantes:
- **Acceso a la descarga de la aplicación móvil:** Vínculos directos a la Play Store.
- **Visualización de información general:** Noticias, novedades y características de RecomFilm.

---

## Tecnologías utilizadas
- **Frontend:** HTML5, CSS3, JavaScript.
- **Backend:** Node.js con Express.
- **Base de datos:** Firebase Firestore (compartida con la aplicación móvil).
- **Autenticación:** Firebase Authentication.
- **Despliegue:** Vercel (o alternativa).

---

## Instalación y configuración
### Requisitos previos:
- Node.js y npm instalados.
- Clonar este repositorio:
  ```bash
  git clone https://github.com/tu_usuario/recomfilm-web.git
  ```

### Pasos para configurar:
1. **Instalar dependencias:**
   ```bash
   cd recomfilm-web
   npm install
   ```

2. **Configurar Firebase:**
   - Añadir el archivo `firebase-config.js` con las credenciales del proyecto Firebase.

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   ```

4. **Acceso local:**
   Visitar `http://localhost:3000` en tu navegador.

---

## Funcionalidades
### Gestión de películas:
- Formulario para añadir nuevas películas (título, director, sinopsis, género).
- Lista interactiva para modificar o eliminar entradas existentes.

### Gestión de usuarios:
- Visualización de cuentas registradas.
- Herramientas para modificar datos de usuarios o eliminarlos.

### Acceso público:
- Página de inicio con una descripción general de la aplicación.
- Sección para descargar la app móvil directamente desde la Play Store.

---

## Roadmap
- **Fase 1:** Despliegue básico con gestión de películas y usuarios.
- **Fase 2:** Integración con Firebase para sincronización en tiempo real.
- **Fase 3:** Implementación de funcionalidades avanzadas, como estadísticas y panel de control.

---

## Licencia
Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).

---
¡De parte de RecomFilm para todos los amantes del cine! 🎥

