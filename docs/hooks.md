# Hooks de React

---

## 1. useState

Guarda un valor que puede cambiar. Cuando cambia, React vuelve a renderizar el componente automáticamente.

### Ejemplo en el proyecto

```typescript
const [colonias, setColonias] = useState<Colonia[]>([])
const [busqueda, setBusqueda] = useState('')
const [modalAbierto, setModalAbierto] = useState(false)
```

### Cuándo usarlo
- Para guardar listas de datos (colonias, gatos)
- Para controlar si un modal está abierto o cerrado
- Para guardar el texto de un campo de búsqueda

---

## 2. useEffect

Se ejecuta cuando algo cambia. Se usa para efectos secundarios como cargar datos, guardar en LocalStorage o suscribirse a eventos.

### Ejemplo en el proyecto

```typescript
// Se ejecuta una sola vez al arrancar la app
// Carga las colonias desde LocalStorage o usa los datos de ejemplo
useEffect(() => {
  const datos = localStorage.getItem('colonias')
  if (datos) {
    setColonias(JSON.parse(datos))
  } else {
    setColonias(COLONIAS_EJEMPLO)
    localStorage.setItem('colonias', JSON.stringify(COLONIAS_EJEMPLO))
  }
}, []) // El [] significa "ejecuta esto solo una vez al montar el componente"
```

### Cuándo usarlo
- Para cargar datos al arrancar la app
- Para guardar datos en LocalStorage cuando cambian
- Para ejecutar código cuando cambia un valor concreto

---

## 3. useMemo

Guarda el resultado de un cálculo y solo lo recalcula cuando cambian sus dependencias. Evita cálculos innecesarios en cada render.

### Ejemplo en el proyecto

```typescript
// Solo recalcula el filtro cuando cambian 'colonias' o 'busqueda'
// Sin useMemo, este filtro se recalcularía en cada render
const coloniasFiltradas = useMemo(() => {
  return colonias.filter(colonia =>
    colonia.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )
}, [colonias, busqueda])
```

### Cuándo usarlo
- Para filtrar listas de datos
- Para calcular estadísticas (número de gatos esterilizados, etc.)
- Para cualquier cálculo que dependa de datos que no cambian constantemente

---

## 4. useCallback

Guarda una función y solo la recrea cuando cambian sus dependencias. Evita que los componentes hijos se rerenderizen innecesariamente.

### Ejemplo en el proyecto

```typescript
// La función añadirColonia no se recrea en cada render
// Sin useCallback, los componentes que reciben esta función se rerenderizarían innecesariamente
const añadirColonia = useCallback((nuevaColonia: Omit<Colonia, 'id'>) => {
  const colonia: Colonia = {
    ...nuevaColonia,
    id: Date.now().toString()
  }
  setColonias(prev => {
    const actualizadas = [...prev, colonia]
    localStorage.setItem('colonias', JSON.stringify(actualizadas))
    return actualizadas
  })
}, [])
```

### Cuándo usarlo
- Para funciones que se pasan como props a componentes hijos
- Para funciones que se usan como dependencias de otros hooks

---

## 5. Custom Hooks

Un custom hook es una función que agrupa varios hooks relacionados y se puede reutilizar en varios componentes. Por convenio, su nombre siempre empieza por `use`.

### useColonias

Gestiona todo lo relacionado con las colonias: cargarlas, filtrarlas, añadirlas y eliminarlas.

```typescript
const {
  colonias,
  coloniasFiltradas,
  busqueda,
  setBusqueda,
  añadirColonia,
  eliminarColonia
} = useColonias()
```

### useGatos

Gestiona todo lo relacionado con los gatos de una colonia: cargarlos, filtrarlos por estado, añadirlos, actualizarlos y eliminarlos.

```typescript
const {
  gatos,
  gatosFiltrados,
  filtro,
  setFiltro,
  añadirGato,
  actualizarGato,
  eliminarGato
} = useGatos('1') // '1' es el ID de la colonia
```

### ¿Por qué usar custom hooks?
- Separan la lógica de la presentación
- Se pueden reutilizar en varios componentes
- Hacen el código más limpio y fácil de mantener
- Facilitan el testing
