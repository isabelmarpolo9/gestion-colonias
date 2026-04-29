import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Colonia } from '../types/index.ts'
import * as api from '../api/client.ts'

export function useColonias() {
  const [colonias, setColonias] = useState<Colonia[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Carga las colonias desde la API al montar el componente
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

  const coloniasFiltradas = useMemo(() => {
    return colonias.filter(colonia =>
      colonia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      colonia.direccion.toLowerCase().includes(busqueda.toLowerCase())
    )
  }, [colonias, busqueda])

  const añadirColonia = useCallback(async (nuevaColonia: Omit<Colonia, 'id'>) => {
    try {
      const colonia = await api.createColonia(nuevaColonia)
      setColonias(prev => [...prev, colonia])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la colonia')
    }
  }, [])

  const eliminarColonia = useCallback(async (id: string) => {
    try {
      await api.deleteColonia(id)
      setColonias(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la colonia')
    }
  }, [])

  return {
    colonias,
    coloniasFiltradas,
    busqueda,
    setBusqueda,
    loading,
    error,
    añadirColonia,
    eliminarColonia
  }
}