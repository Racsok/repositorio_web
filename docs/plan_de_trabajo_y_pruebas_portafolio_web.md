# Plan de Trabajo - Portafolio Web

Este documento detalla la arquitectura técnica, las fases de desarrollo, la estrategia de internacionalización (i18n) y el plan de pruebas (QA & CI) para la construcción y despliegue del portafolio web.

## 1. Stack Tecnológico Seleccionado

* **Framework Web:** Astro (generación de sitios estáticos / SSG, cero JavaScript innecesario en el cliente).
* **Gestión de Contenido:** Astro Content Collections usando archivos Markdown (`.md`) para los proyectos.
* **Estilos y Diseño:** CSS moderno (variables CSS para tema oscuro por defecto) o Tailwind CSS; diseño minimalista con enfoque *Dark Mode* técnico.
* **Internacionalización (i18n):** Enrutamiento nativo de Astro (`/es/` o raíz `/` para español, y `/en/` para inglés) + diccionario de traducciones para elementos de interfaz.
* **Control de Versiones:** Git (flujo basado en ramas `main` y ramas de características `feat/*`).
* **Hosting y CI/CD:** Cloudflare Pages (compilación y despliegue automático conectado al repositorio remoto).

---

## 2. Arquitectura del Proyecto (Astro)

```text
portafolio-web/
├── docs/                  # Documentación técnica (requerimientos, casos de uso, plan)
├── public/                # Archivos estáticos directos (CV en PDF, favicon, imágenes)
│   └── cv/
│       ├── CV_ES.pdf
│       └── CV_EN.pdf
├── src/
│   ├── components/        # Componentes reutilizables (Navbar, ProjectCard, Footer)
│   ├── content/           # Colecciones de contenido en Markdown
│   │   └── projects/
│   │       ├── es/        # Proyectos en español (.md)
│   │       └── en/        # Proyectos en inglés (.md)
│   ├── i18n/              # Diccionarios de traducción de interfaz (ES / EN)
│   ├── layouts/           # Plantilla base HTML (head, meta tags, estilos globales)
│   └── pages/             # Rutas de la aplicación
│       ├── index.astro    # Página principal (Español por defecto)
│       └── en/
│           └── index.astro # Página principal (Inglés)
├── astro.config.mjs       # Configuración de Astro e i18n
└── package.json           # Dependencias y scripts de construcción/pruebas
```

---

## 3. Fases de Desarrollo

### Fase 1: Configuración del Entorno e Inicialización
* **Objetivo:** Preparar el proyecto base de Astro y conectarlo con Cloudflare Pages.
* **Tareas:**
  1. Verificar instalación de Node.js (versión LTS) en el entorno Linux.
  2. Inicializar el proyecto Astro en el repositorio (`npm create astro@latest -- --template minimal`).
  3. Configurar `astro.config.mjs` habilitando el soporte `i18n` (`defaultLocale: 'es'`, `locales: ['es', 'en']`).
  4. Conectar el repositorio remoto en el panel de **Cloudflare Pages** (comando de build: `npm run build`, directorio de salida: `dist`).

### Fase 2: Estructura Base, Tema Oscuro e i18n
* **Objetivo:** Construir el esqueleto visual en modo oscuro y la lógica de cambio de idioma.
* **Tareas:**
  1. Crear el layout principal (`src/layouts/BaseLayout.astro`) definiendo la paleta de colores oscuros (fondo oscuro `#0d1117`, texto claro `#e6edf3`, color de acento técnico).
  2. Crear el diccionario `src/i18n/ui.ts` con los textos estáticos en español e inglés.
  3. Construir la barra de navegación (`Navbar.astro`) con enlaces ancla (Sobre mí, Proyectos, Stack, Contacto) y el selector de idioma (`ES | EN`).

### Fase 3: Contenido y Colección de Proyectos (Markdown)
* **Objetivo:** Poblar el portafolio con la información profesional, el CV y los 3 proyectos iniciales.
* **Tareas:**
  1. Configurar el esquema de validación en `src/content/config.ts` (título, descripción, fecha, etiquetas/tags, URL repositorio, URL demo opcional).
  2. Redactar en Markdown los **3 proyectos principales** tanto en `src/content/projects/es/` como en `src/content/projects/en/`.
  3. Crear la sección de **Stack Tecnológico** categorizada (Lenguajes, Bases de Datos, DevOps/Linux).
  4. Alojar la Hoja de Vida (`CV.pdf`) en `public/cv/` y enlazar el botón de descarga en la sección principal.

### Fase 4: Optimización, SEO y Despliegue Final
* **Objetivo:** Asegurar calidad técnica, accesibilidad y publicación en producción.
* **Tareas:**
  1. Agregar etiquetas meta para SEO y OpenGraph (vista previa al compartir el enlace en LinkedIn).
  2. Ejecutar auditoría de rendimiento y accesibilidad con Lighthouse.
  3. Realizar el merge final a `main` y validar el despliegue en el dominio asignado por Cloudflare Pages.

---

## 4. Plan de Pruebas (Testing & CI)

Para garantizar que el portafolio funcione sin errores visuales ni enlaces rotos, se aplicarán pruebas en dos niveles: validación local de la aplicación y verificación automatizada en Integración Continua (CI).

### 4.1. Pruebas de la Página Web (Nivel Aplicación)

| ID | Tipo de Prueba | Qué se evalúa | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **TP-01** | **Responsividad (UI)** | Visualización en móvil (`375px`), tablet (`768px`) y escritorio (`1440px`). | Sin desbordamiento horizontal, textos legibles y botones táctiles accesibles. |
| **TP-02** | **Navegación e i18n** | Cambio entre versión Español (`/`) e Inglés (`/en/`). | Todos los textos de UI y tarjetas de proyectos cambian al idioma seleccionado sin errores 404. |
| **TP-03** | **Integridad de Recursos** | Descarga del archivo PDF del CV y carga de imágenes. | El archivo `CV.pdf` se descarga/abre correctamente y ninguna imagen muestra icono roto. |
| **TP-04** | **Enlaces Externos** | Enlaces a GitHub, LinkedIn, correo (`mailto:`) y repositorios de proyectos. | Todos los enlaces externos abren en pestaña nueva (`target="_blank"`) y apuntan al destino correcto. |
| **TP-05** | **Rendimiento y SEO** | Auditoría mediante Google Lighthouse (en modo incógnito). | Puntaje $\ge 95$ en Rendimiento, Accesibilidad, Mejores Prácticas y SEO. |

### 4.2. Pruebas de Integración Continua (CI Pipeline)

Antes de que Cloudflare Pages publique una nueva versión en producción, el pipeline de CI (mediante GitHub Actions o el entorno de build de Cloudflare) ejecutará las siguientes comprobaciones automáticas en cada `push` o *Pull Request*:

1. **Validación de Esquemas y Tipos (`astro check`):**
   * Verifica que todos los archivos `.md` de proyectos cumplan con los campos obligatorios definidos en `src/content/config.ts` (evita publicar un proyecto sin título, descripción o enlace) y valida tipos de TypeScript.
2. **Prueba de Compilación (`npm run build`):**
   * Garantiza que Astro genere los archivos estáticos finales en `dist/` sin errores de sintaxis ni rutas rotas.
3. **Verificación de Enlaces Internos (Link Checker):**
   * Ejecución de una herramienta ligera (ej. `lychee` o `htmltest` sobre la carpeta `dist/`) para confirmar que no existan rutas rotas entre las versiones `es` y `en` ni referencias faltantes al CV.
4. **Despliegue de Vista Previa (Cloudflare Preview Deployments):**
   * Al subir cambios a una rama distinta de `main` (ej. `feat/nuevo-proyecto`), Cloudflare generará una URL temporal de previsualización para validar visualmente los cambios antes de fusionarlos a `main`.