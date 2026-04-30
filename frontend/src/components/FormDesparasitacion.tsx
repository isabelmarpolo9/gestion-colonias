import { useState } from 'react'
import * as api from '../api/client.ts'
import Button from './Button'

interface FormDesparasitacionProps {
  gatoId: string
  onCerrar: () => void
  onRecargar?: () => void
}

interface FormData {
  producto: string
  fecha: string
}

interface FormErrors {
  producto?: string
  fecha?: string
}

export default function FormDesparasitacion({ gatoId, onCerrar, onRecargar }: FormDesparasitacionProps) {
  const [formData, setFormData] = useState<FormData>({
    producto: '',
    fecha: ''
  })

  const [errores, setErrores] = useState<FormErrors>({})
  const [exito, setExito] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errores[name as keyof FormErrors]) {
      setErrores(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const validar = (): boolean => {
    const nuevosErrores: FormErrors = {}
    if (!formData.producto.trim()) {
      nuevosErrores.producto = 'El producto es obligatorio'
    }
    if (!formData.fecha) {
      nuevosErrores.fecha = 'La fecha es obligatoria'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async () => {
    if (!validar()) return

    try {
      const gato = await api.getGatoById(gatoId)
      const nuevaDesparasitacion = {
        id: Date.now().toString(),
        producto: formData.producto.trim(),
        fecha: formData.fecha
      }
      await api.updateGato(gatoId, {
        desparasitaciones: [...gato.desparasitaciones, nuevaDesparasitacion]
      })
      if (onRecargar) onRecargar()
      setExito(true)
      setTimeout(() => onCerrar(), 1500)
    } catch {
      setErrores({ producto: 'Error al registrar la desparasitacion' })
    }
  }

  return (
    <div>
      {exito && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-green-700 font-medium">Desparasitacion registrada correctamente</p>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Producto *</label>
        <input
          type="text"
          name="producto"
          value={formData.producto}
          onChange={handleChange}
          placeholder="Ej: Stronghold"
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errores.producto ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errores.producto && <p className="text-red-500 text-xs mt-1">{errores.producto}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${errores.fecha ? 'border-red-400' : 'border-gray-300'}`}
        />
        {errores.fecha && <p className="text-red-500 text-xs mt-1">{errores.fecha}</p>}
      </div>

      <div className="flex gap-2 justify-end">
        <Button texto="Cancelar" onClick={onCerrar} tipo="secundario" />
        <Button texto="Registrar" onClick={handleSubmit} tipo="primario" />
      </div>
    </div>
  )
}