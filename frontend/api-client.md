# Capa de Red y Cliente de API

---

## 1. Que es la capa de red

La capa de red es el conjunto de funciones del frontend que se comunican con el backend. Esta en `src/api/client.ts` y es el unico lugar donde se hacen peticiones HTTP.

Ningun componente habla directamente con el backend. Siempre pasan por el cliente de API.

---

## 2. Cliente de API tipado

El cliente de API esta en `src/api/client.ts`. Contiene una funcion generica `request` que gestiona todas las peticiones:

```typescript
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Error en la peticion')
  }
  return response.json()
}
```

Todas las funciones del cliente usan `request` internamente:

```typescript
export async function getColonias(): Promise<Colonia[]> {
  return request<Colonia[]>('/colonias')
}

export async function createColonia(datos: Omit<Colonia, 'id'>): Promise<Colonia> {
  return request<Colonia>('/colonias', {
    method: 'POST',
    body: JSON.stringify(datos)
  })
}
```

---

## 3. Tipos alineados con el backend

Los tipos del frontend (`src/types/index.ts`) estan alineados con los tipos del backend (`src/config/data.ts`). Esto garantiza que los datos que devuelve la API coinciden con lo que espera el frontend.

```typescript
export interface Colonia {
  id: string
  nombre: string
  direccion: string
  cuidador: string
  coordenadas: { lat: number; lng: number }
}

export interface Gato {
  id: string
  coloniaId: string
  nombre: string
  color: string
  sexo: 'macho' | 'hembra'
  edad: number
  esterilizado: boolean
  testado: boolean
  resultadoTest: 'positivo' | 'negativo' | null
  enfermo: boolean
  descripcionEnfermedad: string
  embarazada: boolean
  foto: string
  desparasitaciones: Desparasitacion[]
}
```

---

## 4. Los tres estados de red

Cada peticion a la API puede estar en uno de estos tres estados:

- **loading**: la peticion esta en curso, se muestra un mensaje de carga
- **success**: la peticion termino bien, se muestran los datos
- **error**: la peticion fallo, se muestra un mensaje de error

Estos estados se gestionan en los hooks `useColonias` y `useGatos`:

```typescript
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
  setLoading(true)
  api.getColonias()
    .then(datos => {
      setColonias(datos)
      setLoading(false)
    })
    .catch(err => {
      setError(err.message)
      setLoading(false)
    })
}, [])
```

Y se muestran en la UI:

```tsx
{loadingColonias && <p>Cargando colonias...</p>}
{errorColonias && <p>Error: {errorColonias}</p>}
```

---

## 5. La API como fuente de verdad

Anteriormente los datos se guardaban en LocalStorage. Ahora la API es la unica fuente de verdad:

- Al arrancar la app se cargan los datos desde la API
- Al crear, actualizar o eliminar datos se llama a la API
- El estado local de React se actualiza con la respuesta de la API

Esto garantiza que todos los usuarios ven los mismos datos.