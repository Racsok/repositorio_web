node -v
npm -v

# Inicializar Astro (puedes nombrar el proyecto como prefieras, ej. 'portafolio')
npm create astro@latest .


# Crear carpetas para las páginas separadas por idioma
mkdir -p src/pages/es src/pages/en src/content/projects

# Crear archivo de configuración i18n y layouts base
mkdir -p src/i18n src/layouts src/components
touch src/i18n/ui.ts src/layouts/Layout.astro

npm run dev
