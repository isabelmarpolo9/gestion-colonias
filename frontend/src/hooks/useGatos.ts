import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Gato } from '../types/index.ts'
import * as api from '../api/client.ts'

export function useGatos(coloniaId?: string) {
  const [gatos, setGatos] = useState<Gato[]>([])
  const [filtro, setFiltro] = useState<'todos' | 'esterilizado' | 'enfermo' | 'embarazada' | 'testado'>('todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carga los gatos desde la API al montar el componente
  useEffect(() => {
  let activo = true

  const peticion = coloniaId
    ? api.getGatosByColonia(coloniaId)
    : api.getGatos()

  peticion
    .then(datos => {
      if (activo) {
        setGatos(datos)
        setLoading(false)
      }
    })
    .catch(err => {
      if (activo) {
        setError(err.message)
        setLoading(false)
      }
    })

  return () => { activo = false }
}, [coloniaId])

  const gatosFiltrados = useMemo(() => {
    if (filtro === 'esterilizado') return gatos.filter(g => g.esterilizado)
    if (filtro === 'enfermo') return gatos.filter(g => g.enfermo)
    if (filtro === 'embarazada') return gatos.filter(g => g.embarazada)
    if (filtro === 'testado') return gatos.filter(g => g.testado)
    return gatos
  }, [gatos, filtro])

  const añadirGato = useCallback(async (nuevoGato: Omit<Gato, 'id' | 'coloniaId'>) => {
    if (!coloniaId) return
    try {
      const gato = await api.createGato(coloniaId, nuevoGato)
      setGatos(prev => [...prev, gato])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el gato')
    }
  }, [coloniaId])

  const actualizarGato = useCallback(async (id: string, cambios: Partial<Gato>) => {
    try {
      const gato = await api.updateGato(id, cambios)
      setGatos(prev => prev.map(g => g.id === id ? gato : g))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el gato')
    }
  }, [])

  const eliminarGato = useCallback(async (id: string) => {
    try {
      await api.deleteGato(id)
      setGatos(prev => prev.filter(g => g.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar el gato')
    }
  }, [])

  const recargar = useCallback(() => {
  const peticion = coloniaId
    ? api.getGatosByColonia(coloniaId)
    : api.getGatos()
  peticion.then(datos => setGatos(datos)).catch(err => setError(err.message))
}, [coloniaId])

  return {
    gatos,
    gatosFiltrados,
    filtro,
    setFiltro,
    loading,
    error,
    añadirGato,
    actualizarGato,
    eliminarGato,
    recargar
  }
}