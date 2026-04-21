# Context y Estado Global

---

## 1. ¿Qué es Context API?

Context API es una herramienta de React que permite compartir datos entre componentes sin tener que pasarlos manualmente de padre a hijo a través de props.

Sin Context, si un componente necesita datos que están en otro componente, hay que ir pasándolos hacia abajo por toda la jerarquía de componentes. Esto se llama **prop drilling** y hace el código muy difícil de mantener.

Con Context, los datos se guardan en un almacén central al que cualquier componente puede acceder directamente.

---

## 2. ¿Cuándo usar Context API?

Context es útil cuando:

- Los datos los necesitan muchos componentes en distintos niveles de la jerarquía
- Se quiere evitar pasar props por varios niveles intermedios
- Se gestiona estado global como listas de datos, preferencias del usuario, o el tema de la app

Context **no es necesario** cuando:
- Los datos solo los necesita un componente o sus hijos directos
- El estado es pequeño y local (si un modal está abierto, etc.)

---

## 3. Implementación en el proyecto

### AppContext.tsx

El contexto central de la app. Agrupa el estado de colonias y gatos y lo comparte con toda la aplicación.

```tsx
// Creamos el contexto
const AppContext = createContext<AppContextType | null>(null)

// El Provider envuelve toda la app y comparte el estado
export function AppProvider({ children }: AppProviderProps) {
  const coloniasHook = useColonias()
  const gatosHook = useGatos()

  return (
    <AppContext.Provider value={{ ...coloniasHook, ...gatosHook }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook para consumir el contexto fácilmente
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider')
  }
  return context
}
```

### main.tsx

El Provider envuelve toda la app en el punto de entrada:

```tsx
<AppProvider>
  <App />
</AppProvider>
```

### Consumir el contexto en un componente

Cualquier componente puede acceder al estado global así:

```tsx
import { useAppContext } from '../context/AppContext'

function MiComponente() {
  const { colonias, añadirColonia } = useAppContext()

  return (
    <div>
      {colonias.map(colonia => (
        <p key={colonia.id}>{colonia.nombre}</p>
      ))}
    </div>
  )
}
```

---

## 4. Estructura del contexto

El contexto expone todo lo necesario para gestionar colonias y gatos:

### Colonias
- `colonias` → lista completa de colonias
- `coloniasFiltradas` → colonias filtradas por búsqueda
- `busqueda` → texto de búsqueda actual
- `setBusqueda` → función para cambiar la búsqueda
- `añadirColonia` → función para añadir una colonia nueva
- `eliminarColonia` → función para eliminar una colonia

### Gatos
- `gatos` → lista completa de gatos
- `gatosFiltrados` → gatos filtrados por estado
- `filtro` → filtro activo (todos, esterilizado, enfermo, embarazada, testado)
- `setFiltro` → función para cambiar el filtro
- `añadirGato` → función para añadir un gato nuevo
- `actualizarGato` → función para actualizar los datos de un gato
- `eliminarGato` → función para eliminar un gato