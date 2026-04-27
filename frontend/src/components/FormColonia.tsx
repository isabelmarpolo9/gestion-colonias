// FormColonia.tsx
// Formulario controlado para crear una nueva colonia

import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Button from './Button'

interface FormColoniaProps {
  onCerrar: () => void
}

// Definimos el tipo del formulario
interface FormData {
  nombre: string
  direccion: string
  cuidador: string
}

// Definimos los errores posibles
interface FormErrors {
  nombre?: string
  direccion?: string
  cuidador?: string
}

export default function FormColonia({ onCerrar }: FormColoniaProps) {
  // Estado del formulario con todos los campos
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    direccion: '',
    cuidador: ''
  })

  // Estado de los errores de validación
  const [errores, setErrores] = useState<FormErrors>({})

  // Estado para mostrar mensaje de éxito
  const [exito, setExito] = useState(false)

  const { añadirColonia } = useAppContext()

  // Función que actualiza el campo correspondiente cuando el usuario escribe
  // Usamos el name del input para saber qué campo actualizar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Borramos el error del campo cuando el usuario empieza a escribir
    if (errores[name as keyof FormErrors]) {
      setErrores(prev => ({ ...prev, [name]: undefined }))
    }
  }

  // Función de validación
  // Devuelve true si el formulario es válido, false si hay errores
  const validar = (): boolean => {
    const nuevosErrores: FormErrors = {}

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio'
    } else if (formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres'
    }

    if (!formData.direccion.trim()) {
      nuevosErrores.direccion = 'La dirección es obligatoria'
    }

    if (!formData.cuidador.trim()) {
      nuevosErrores.cuidador = 'El cuidador es obligatorio'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = () => {
    if (!validar()) return

    añadirColonia({
      nombre: formData.nombre.trim(),
      direccion: formData.direccion.trim(),
      cuidador: formData.cuidador.trim(),
      coordenadas: { lat: 0, lng: 0 }
    })

    setExito(true)
    setTimeout(() => {
      onCerrar()
    }, 1500)
  }

  return (
    <div>
      {/* Mensaje de éxito */}
      {exito && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-green-700 font-medium">Colonia creada correctamente</p>
        </div>
      )}

      {/* Campo nombre */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la colonia *
        </label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Colonia del Parque"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
            errores.nombre ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errores.nombre && (
          <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>
        )}
      </div>

      {/* Campo dirección */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dirección *
        </label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Ej: Calle Mayor 1, Zaragoza"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
            errores.direccion ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errores.direccion && (
          <p className="text-red-500 text-xs mt-1">{errores.direccion}</p>
        )}
      </div>

      {/* Campo cuidador */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cuidador responsable *
        </label>
        <input
          type="text"
          name="cuidador"
          value={formData.cuidador}
          onChange={handleChange}
          placeholder="Ej: Isabel"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
            errores.cuidador ? 'border-red-400' : 'border-gray-300'
          }`}
        />
        {errores.cuidador && (
          <p className="text-red-500 text-xs mt-1">{errores.cuidador}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-2 justify-end">
        <Button texto="Cancelar" onClick={onCerrar} tipo="secundario" />
        <Button texto="Crear colonia" onClick={handleSubmit} tipo="primario" />
      </div>
    </div>
  )
}