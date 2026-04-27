import { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import Button from './Button'

interface FormGatoProps {
  coloniaId: string
  onCerrar: () => void
}

interface FormData {
  nombre: string
  color: string
  sexo: 'macho' | 'hembra'
  edad: string
}

interface FormErrors {
  nombre?: string
  color?: string
  edad?: string
}

export default function FormGato({ coloniaId, onCerrar }: FormGatoProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    color: '',
    sexo: 'macho',
    edad: ''
  })

  const [errores, setErrores] = useState<FormErrors>({})
  const [exito, setExito] = useState(false)

  const { añadirGato } = useAppContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errores[name as keyof FormErrors]) {
      setErrores(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validar = (): boolean => {
    const nuevosErrores: FormErrors = {}

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio'
    } else if (formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres'
    }

    if (!formData.color.trim()) {
      nuevosErrores.color = 'El color es obligatorio'
    }

    if (!formData.edad) {
      nuevosErrores.edad = 'La edad es obligatoria'
    } else if (isNaN(Number(formData.edad)) || Number(formData.edad) < 0) {
      nuevosErrores.edad = 'La edad debe ser un numero positivo'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = () => {
    if (!validar()) return

    añadirGato({
      coloniaId,
      nombre: formData.nombre.trim(),
      color: formData.color.trim(),
      sexo: formData.sexo,
      edad: Number(formData.edad),
      esterilizado: false,
      testado: false,
      resultadoTest: null,
      enfermo: false,
      descripcionEnfermedad: '',
      embarazada: false,
      foto: '',
      desparasitaciones: []
    })

    setExito(true)
    setTimeout(() => {
      onCerrar()
    }, 1500)
  }

  return (
    <div>
      {exito && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-green-700 font-medium">Gato añadido correctamente</p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Manchas"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errores.nombre ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          placeholder="Ej: negro y blanco"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errores.color ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errores.color && <p className="text-red-500 text-xs mt-1">{errores.color}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Sexo *</label>
        <select
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="macho">Macho</option>
          <option value="hembra">Hembra</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Edad aproximada (anos) *</label>
        <input
          type="number"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
          placeholder="Ej: 3"
          min="0"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errores.edad ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errores.edad && <p className="text-red-500 text-xs mt-1">{errores.edad}</p>}
      </div>

      <div className="flex gap-2 justify-end">
        <Button texto="Cancelar" onClick={onCerrar} tipo="secundario" />
        <Button texto="Añadir gato" onClick={handleSubmit} tipo="primario" />
      </div>
    </div>
  )
}