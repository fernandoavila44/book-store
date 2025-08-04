# Descripción

Aplicación de una tienda de libros que utiliza:

React con TypeScript

Hooks: useState, useEffect, useReducer, useContext, useMemo, useCallback

Routing: React Router DOM

API Mock: JSON Server para simular una API REST

##  Instalación y Ejecución

1. Clonar el repositorio
git clone https://github.com/tu-usuario/tienda-libros-react.git
cd tienda-libros-react

2. Instalar dependencias
npm install

3. Levantar la API Mock (JSON Server)
npm run mock-api
📌 Nota: La API se ejecutará en http://localhost:3001 con los datos de db.json.

4. Iniciar la aplicación (Vite)
npm run dev

Método	Endpoint	Descripción
GET	/books	Obtener todos los libros
GET	/books/:id	Obtener un libro por ID

### Funcionalidades Principales

✔️ Catálogo de libros (fetch desde API mock)
✔️ Carrito de compras (gestión con useReducer)
✔️ Búsqueda de libros (filtrado por título)
✔️ Checkout (simulación de compra)
✔️ Diseño responsive