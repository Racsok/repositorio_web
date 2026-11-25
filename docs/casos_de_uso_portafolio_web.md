# Casos de Uso - Portafolio Web

Este documento describe las interacciones principales entre los usuarios y el sistema del portafolio web, manteniendo un enfoque minimalista y funcional.

---

## 1. Actores del Sistema

* **Visitante (Reclutador / Cliente / Colega):** Usuario externo que accede al portafolio para evaluar el perfil técnico, revisar proyectos y obtener información de contacto.
* **Administrador (Propietario):** Desarrollador del portafolio encargado de actualizar la información, agregar nuevos proyectos y mantener el repositorio.

---

## 2. Diagrama General de Interacción

```text
+-------------------+       +---------------------------------------+
|                   | ----> | CU-01: Consultar perfil profesional   |
|                   | ----> | CU-02: Explorar proyectos destacados  |
|     Visitante     | ----> | CU-03: Filtrar/Ver stack tecnológico  |
|                   | ----> | CU-04: Descargar Hoja de Vida (CV)    |
|                   | ----> | CU-05: Contactar al propietario       |
+-------------------+       +---------------------------------------+

+-------------------+       +---------------------------------------+
|   Administrador   | ----> | CU-06: Actualizar contenido y deploy  |
+-------------------+       +---------------------------------------+
```

---

## 3. Especificación de Casos de Uso

### CU-01: Consultar perfil profesional
* **Actor:** Visitante.
* **Descripción:** El usuario ingresa a la página principal y lee la presentación inicial para conocer el enfoque profesional del propietario.
* **Precondiciones:** El sitio web debe estar desplegado y accesible mediante su URL.
* **Flujo Principal:**
  1. El visitante accede a la URL raíz del portafolio.
  2. El sistema muestra la sección "Sobre mí" con una breve biografía, rol objetivo (ej. Ingeniería de Datos / Backend) y enlaces a redes profesionales (GitHub, LinkedIn).
* **Postcondiciones:** El visitante comprende rápidamente el perfil del desarrollador.

---

### CU-02: Explorar proyectos destacados
* **Actor:** Visitante.
* **Descripción:** El usuario revisa el listado de proyectos desarrollados para evaluar la experiencia práctica y la calidad del código.
* **Precondiciones:** Debe existir al menos un proyecto publicado en la sección correspondiente.
* **Flujo Principal:**
  1. El visitante navega hacia la sección "Proyectos".
  2. El sistema despliega las tarjetas de cada proyecto con su título, descripción breve y etiquetas de tecnologías usadas.
  3. El visitante hace clic en el enlace "Ver código" o "Demo" de un proyecto de su interés.
  4. El sistema redirige en una nueva pestaña al repositorio correspondiente (GitHub/GitLab) o al despliegue en vivo.
* **Postcondiciones:** El visitante puede inspeccionar el código fuente o funcionamiento del proyecto elegido.

---

### CU-03: Visualizar stack tecnológico
* **Actor:** Visitante.
* **Descripción:** El usuario identifica las herramientas, lenguajes y tecnologías que domina el propietario.
* **Precondiciones:** Ninguna.
* **Flujo Principal:**
  1. El visitante se desplaza a la sección "Habilidades" o "Stack Tecnológico".
  2. El sistema muestra las tecnologías agrupadas por categorías claras (Lenguajes, Bases de Datos, Herramientas/DevOps).
* **Postcondiciones:** El visitante valida si el perfil cumple con los requisitos técnicos buscados.

---

### CU-04: Descargar Hoja de Vida (CV)
* **Actor:** Visitante.
* **Descripción:** El usuario obtiene una copia en formato PDF del currículum vitae para guardarlo o compartirlo en un proceso de selección.
* **Precondiciones:** El archivo PDF del CV debe estar alojado y enlazado correctamente en los recursos estáticos del proyecto.
* **Flujo Principal:**
  1. El visitante hace clic en el botón "Descargar CV" (ubicado en el inicio o en el pie de página).
  2. El navegador abre o inicia la descarga directa del archivo `CV_[Nombre].pdf`.
* **Postcondiciones:** El visitante cuenta con el documento actualizado en su dispositivo.

---

### CU-05: Contactar al propietario
* **Actor:** Visitante.
* **Descripción:** El usuario utiliza los medios disponibles para iniciar comunicación laboral o profesional.
* **Precondiciones:** Ninguna.
* **Flujo Principal:**
  1. El visitante accede a la sección "Contacto" o al pie de página.
  2. El visitante selecciona una de las opciones disponibles:
     * Hacer clic en el enlace de correo electrónico (abre su cliente de correo predeterminado mediante `mailto:`).
     * Copiar la dirección de correo al portapapeles.
     * Visitar el perfil de LinkedIn para enviar un mensaje directo.
* **Postcondiciones:** Se establece un canal de comunicación con el propietario.

---

### CU-06: Actualizar contenido y desplegar cambios
* **Actor:** Administrador.
* **Descripción:** El propietario agrega un nuevo proyecto o actualiza su información y publica los cambios en producción.
* **Precondiciones:** Acceso al repositorio local y permisos de escritura en el repositorio remoto.
* **Flujo Principal:**
  1. El administrador modifica el archivo fuente correspondiente en su entorno local.
  2. Verifica visualmente los cambios en su navegador local.
  3. Realiza un `commit` descriptivo y ejecuta `git push` hacia la rama `main`.
  4. El servicio de hosting (ej. GitHub Pages, Vercel o Netlify) detecta el cambio y actualiza el sitio automáticamente.
* **Postcondiciones:** El portafolio en producción refleja la información actualizada.