# Formularios e Interaccion

---

## 1. Que es un formulario controlado

En React, un formulario controlado es aquel donde cada campo esta ligado al estado mediante `value` y `onChange`. React tiene el control total del formulario en todo momento.

Sin formulario controlado:
```tsx
<input type="text" />
```

Con formulario controlado:
```tsx
const [nombre, setNombre] = useState('')
<input type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
```

La diferencia es que en el formulario controlado, React sabe en todo momento que hay escrito en cada campo.

---

## 2. Estructura de un formulario

Todos los formularios del proyecto siguen la misma estructura:

1. **Estado del formulario**: guarda los valores de cada campo
2. **Estado de errores**: guarda los mensajes de error de cada campo
3. **Estado de exito**: controla si mostrar el mensaje de confirmacion
4. **handleChange**: actualiza el campo correspondiente cuando el usuario escribe
5. **validar**: comprueba que los campos son correctos antes de enviar
6. **handleSubmit**: valida y envia el formulario

```tsx
const [formData, setFormData] = useState({ nombre: '', direccion: '' })
const [errores, setErrores] = useState({})
const [exito, setExito] = useState(false)

const handleChange = (e) => {
  const { name, value } = e.target
  setFormData(prev => ({ ...prev, [name]: value }))
}

const validar = () => {
  const nuevosErrores = {}
  if (!formData.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio'
  setErrores(nuevosErrores)
  return Object.keys(nuevosErrores).length === 0
}

const handleSubmit = () => {
  if (!validar()) return
  // enviar datos
}
```

---

## 3. Formularios del proyecto

### FormColonia
Permite crear una nueva colonia. Campos: nombre, direccion y cuidador.

Validaciones:
- Nombre obligatorio y minimo 3 caracteres
- Direccion obligatoria
- Cuidador obligatorio

### FormGato
Permite añadir un nuevo gato a una colonia. Campos: nombre, color, sexo y edad.

Validaciones:
- Nombre obligatorio y minimo 2 caracteres
- Color obligatorio
- Edad obligatoria y debe ser un numero positivo

### FormDesparasitacion
Permite registrar una desparasitacion en la ficha de un gato. Campos: producto y fecha.

Validaciones:
- Producto obligatorio
- Fecha obligatoria

---

## 4. Validacion

La validacion se hace antes de enviar el formulario. Si hay errores se muestran debajo de cada campo en rojo y no se envia el formulario.

```tsx
const validar = (): boolean => {
  const nuevosErrores: FormErrors = {}

  if (!formData.nombre.trim()) {
    nuevosErrores.nombre = 'El nombre es obligatorio'
  }

  setErrores(nuevosErrores)
  return Object.keys(nuevosErrores).length === 0
}
```

---

## 5. Mensajes de error y confirmacion

Los errores se muestran debajo de cada campo en rojo:

```tsx
{errores.nombre && (
  <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>
)}
```

El borde del campo cambia a rojo si hay error:

```tsx
className={`border rounded-lg ${errores.nombre ? 'border-red-400' : 'border-gray-300'}`}
```

El mensaje de exito se muestra durante 1.5 segundos y luego cierra el modal:

```tsx
setExito(true)
setTimeout(() => onCerrar(), 1500)
```