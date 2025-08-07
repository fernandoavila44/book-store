# Descripción

Aplicación de una tienda de libros que utiliza:

React con TypeScript

Hooks: useState, useEffect, useReducer, useContext, useMemo, useCallback

Routing: React Router DOM

API Mock: JSON Server para simular una API REST

##  Instalación y Ejecución

1. Clonar el repositorio
git clone https://github.com/fernandoavila44/book-store
cd book-store

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

#### Flujo de trabajo para estudiantes

# Clonar el repositorio
git clone https://github.com/fernandoavila44/book-store
cd tu-repositorio

# Crear una rama nueva (recomendación: usar su nombre)
git checkout -b nombre-estudiante-feature

# Hacer sus cambios y commits
git add .
git commit -m "Descripción de los cambios"

# Subir su rama al repositorio
git push origin nombre-estudiante-feature

##### Pasos a seguir

1. Completar archivo Cartcontext.tsx
2. Completar archivo useFetch.tsx
3. Completar archivo Booklist.tsx
4. Completar archivo Cart.tsx
5. Completar archivo BookPage.tsx
6. Completar archivo CheckoutPage.tsx

Good Luck Budies!!!