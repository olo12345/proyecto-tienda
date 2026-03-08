# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Cambios 07-03 / 08-03
 - Se elimina App.css (manejaremos el css solamente con index.css)
 - Se instala tailwindcss
 - Se importa tailwind en index.css
 - Se llama index.css en main.jsx
 - Se incorpora ruta a cart desde vista usuario en el navbar
 - Se genera vista básica del registro (ver lo de la API para enviar datos)
 - Se ajusta el Navbar para distintas vistas (useLocation)
 - Se incorpora buscador en Navbar (UseState para el dinamismo)(recordar conectar el SearchTerm)
 - Se modifica el Home incorporando el "Hero Section" con botón para ir a tienda (se incorpora useNavigate para dpoder ir a "Gallery" desde esta Herro Section)
 - IMPORTANTE: Falta incorporar la ruta al APP.Jsx (Nota, si estaba bajo la ruta /Store) queda modificado en el Home
 - Se incorpora sección destacados en el Home
 - Se incorpora sección "Sobre Nostros" (sólida, no la necesitamos modificar ni un lugar donde modificarla)
 - Se corrije incongruencias de idioma en el Navbar "Registro" por "Register"
 - Se incorpora un Footer
 - Se modifican los 3 Layours para incorporar el Footer
 - Se usa el truco de useLocation para que se reconozca el tipo de layout en el que se encuentra (ver si será publico o no después)
 - Se modifica el Gallery (Store), se incorporan cards y se incorpora la lógica de usuario loggeado o no (con las rutas correspondientes)
 - Habilitams users.js para que sea independiente de la API mientras para evaluar también las vistas protegidas
 - Se diseña Cart a partir de "Pizzería", se deja logica comentada para cuando trabajemos con Node
 - Se modifica Index.html para incorporar nombre correcto de la tienda // Falta agregar el icono de la pagina