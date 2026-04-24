# Rutas y Navegación

---

## 1. Configuración de React Router

Se usa React Router v6 para gestionar la navegación entre páginas. El componente `BrowserRouter` envuelve toda la app en `App.tsx` y el componente `Routes` define las rutas disponibles.

---

## 2. Estructura de rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | HomePage | Listado de todas las colonias |
| `/colonia/:id` | ColonyPage | Gatos de una colonia concreta |
| `/gato/:id` | CatPage | Ficha completa de un gato |
| `*` | NotFoundPage | Página 404 para rutas inexistentes |

---

## 3. Páginas

### HomePage
Página principal de la aplicación. Muestra el listado de todas las colonias con un buscador para filtrarlas. Desde aquí se puede navegar a la página de cada colonia.

### ColonyPage
Muestra los gatos de una colonia concreta. Recibe el ID de la colonia por la URL (`/colonia/:id`). Incluye filtros para ver gatos por estado: esterilizado, enfermo, embarazada o testado.

### CatPage
Muestra la ficha completa de un gato. Recibe el ID del gato por la URL (`/gato/:id`). Permite marcar y desmarcar estados, y ver el historial de desparasitaciones.

### NotFoundPage
Página 404 que se muestra cuando el usuario navega a una ruta que no existe. Incluye un botón para volver al inicio.

---

## 4. Navegación

La navegación entre páginas se hace con dos métodos:

### Link
Para enlaces estáticos en el Header:
```tsx
<Link to="/">Colonias</Link>
```

### useNavigate
Para navegación programática, por ejemplo al hacer clic en una tarjeta:
```tsx
const navigate = useNavigate()
navigate(`/colonia/${colonia.id}`)
```

---

## 5. Parámetros de URL

Las rutas `/colonia/:id` y `/gato/:id` reciben un parámetro dinámico `:id`. Se extrae con el hook `useParams`:

```tsx
const { id } = useParams()
const colonia = colonias.find(c => c.id === id)
```

---

## 6. Página 404

La ruta `*` captura cualquier URL que no coincida con las rutas definidas y muestra la página `NotFoundPage`. También se redirige a `/404` desde `ColonyPage` y `CatPage` si no se encuentra la colonia o el gato con el ID de la URL.
