# ModSaes - Chrome Extension (IPN SAES Helper)

ModSaes es una extensión para Google Chrome diseñada para mejorar la experiencia dentro de la plataforma **SAES del IPN**, facilitando la visualización, organización y gestión de horarios y materias.

Su objetivo es reducir fricción en la consulta de información académica, ofreciendo una interfaz más clara, rápida y funcional para estudiantes.

---

## ✨ Características

- 📅 Visualización clara y estructurada de horarios.
- ⚡ Detección de empalmes entre materias en tiempo real.
- 🧠 Selección dinámica de materias con actualización inmediata.
- 💾 Persistencia de selección mediante `sessionStorage`.
- 🎨 Interfaz minimalista tipo overlay, enfocada en usabilidad.
- 🔄 Renderizado dinámico de tablas sin recargar la página.

---

## 🧱 Tecnologías utilizadas

- React + TypeScript
- Vite (build system)
- Chrome Extensions API (Manifest V3)
- DOM Manipulation (content scripts)
- CSS moderno para UI overlay

---

## 🚀 Instalación desde Chrome Web Store

1. Abre la [Chrome Web Store](https://chrome.google.com/webstore).
2. Busca **ModSaes**.
3. Haz clic en **Añadir a Chrome**.
4. Confirma la instalación.
5. La extensión aparecerá en la barra de herramientas del navegador.

---

## 🛠️ Instalación en modo desarrollo

Si deseas ejecutar el proyecto desde el código fuente:

1. Clona este repositorio:
  ```bash
  git clone <https://github.com/Alnn7Bf/modsaes-app>
  ```

2. Instala dependencias:
  ```bash
  npm install
  ```

3. Compila el proyecto:
  ```bash
  npm run build
  ```

4. Abre Chrome y entra a:
  ```bash
  chrome://extensions/
  ```

5. Activa “Modo desarrollador”.

6. Carga la carpeta `dist/`.

---

## 📌 Uso

1. Abre SAES del IPN.
2. Activa la extensión.
3. Selecciona tus materias.
4. Visualiza tu horario automáticamente.
5. Evita empalmes con validación integrada.

---

## 🧠 Arquitectura

- Content Script: inyecta la UI en SAES.
- React UI: renderiza la interfaz.
- Vite: compila el proyecto.
- Manifest V3: configuración de la extensión.

---

## 📄 Licencia

Este proyecto está bajo licencia MIT.

Consulta el archivo LICENSE para más detalles.