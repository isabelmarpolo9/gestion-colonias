# Documentación de Componentes

---

## 1. Badge

Componente reutilizable para mostrar el estado de un gato mediante una etiqueta de color.

### Props

| Prop | Tipo | Obligatorio | Descripción |
|------|------|-------------|-------------|
| texto | string | ✅ | Texto que muestra el badge |
| color | 'verde' \| 'rojo' \| 'amarillo' \| 'azul' \| 'gris' | ✅ | Color del badge |

### Uso

```tsx
<Badge texto="Esterilizado" color="verde" />
<Badge texto="Enfermo" color="rojo" />
<Badge texto="Embarazada" color="amarillo" />
<Badge texto="Testado" color="azul" />
<Badge texto="Sin datos" color="gris" />
```

### Cuándo usarlo
Siempre que se quiera mostrar el estado de un gato de forma visual y compacta.

---

## 2. Button

Componente reutilizable para botones de la aplicación con tres variantes de estilo.

### Props

| Prop | Tipo | Obligatorio | Descripción |
|------|------|-------------|-------------|
| texto | string | ✅ | Texto del botón |
| onClick | () => void | ✅ | Función que se ejecuta al hacer clic |
| tipo | 'primario' \| 'secundario' \| 'peligro' | ❌ | Variante de estilo (por defecto: primario) |
| disabled | boolean | ❌ | Deshabilita el botón (por defecto: false) |

### Uso

```tsx
<Button texto="Guardar" onClick={() => guardar()} tipo="primario" />
<Button texto="Cancelar" onClick={() => cancelar()} tipo="secundario" />
<Button texto="Eliminar" onClick={() => eliminar()} tipo="peligro" />
<Button texto="Deshabilitado" onClick={() => {}} disabled={true} />
```

### Cuándo usarlo
Para cualquier acción que el usuario pueda realizar en la app.

---

## 3. Card

Componente reutilizable para mostrar información en forma de tarjeta. Se usa para listar colonias y gatos.

### Props

| Prop | Tipo | Obligatorio | Descripción |
|------|------|-------------|-------------|
| titulo | string | ✅ | Título principal de la tarjeta |
| subtitulo | string | ❌ | Texto secundario debajo del título |
| children | React.ReactNode | ❌ | Contenido adicional dentro de la tarjeta |
| onClick | () => void | ❌ | Si se pasa, la tarjeta es clicable |

### Uso

```tsx
<Card titulo="Colonia del Parque" subtitulo="Calle Mayor 1" onClick={() => navegar()}>
  <Badge texto="5 gatos" color="azul" />
</Card>
```

### Cuándo usarlo
Para mostrar colonias en el listado principal y gatos dentro de una colonia.

---

## 4. Modal

Componente reutilizable para ventanas emergentes. Contiene un título, un botón de cerrar y acepta cualquier contenido dentro.

### Props

| Prop | Tipo | Obligatorio | Descripción |
|------|------|-------------|-------------|
| titulo | string | ✅ | Título del modal |
| onCerrar | () => void | ✅ | Función que se ejecuta al cerrar el modal |
| children | React.ReactNode | ✅ | Contenido del modal (formularios, etc.) |

### Uso

```tsx
const [abierto, setAbierto] = useState(false)

<Button texto="Añadir gato" onClick={() => setAbierto(true)} tipo="primario" />

{abierto && (
  <Modal titulo="Añadir gato" onCerrar={() => setAbierto(false)}>
    <p>Aquí va el formulario</p>
  </Modal>
)}
```

### Cuándo usarlo
Para formularios de añadir gato, registrar desparasitación o confirmar eliminación.

---

## 5. Header

Barra de navegación que aparece en todas las páginas de la aplicación.

### Props

No tiene props. Es un componente fijo que siempre muestra lo mismo.

### Uso

```tsx
<Header />
```

### Cuándo usarlo
Se coloca una sola vez en el componente raíz `App.tsx` y aparece en todas las páginas automáticamente gracias a React Router.