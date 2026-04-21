// useGatos.ts
// Custom hook que gestiona todo lo relacionado con los gatos de una colonia

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Gato } from '../types/index'

// Datos de ejemplo
const GATOS_EJEMPLO: Gato[] = [
  {
    id: '1',
    coloniaId: '1',
    nombre: 'Manchas',
    color: 'negro y blanco',
    sexo: 'macho',
    edad: 3,
    esterilizado: true,
    testado: true,
    enfermo: false,
    descripcionEnfermedad: '',
    embarazada: false,
    foto: '',
    desparasitaciones: [
      { id: '1', fecha: '2024-01-15', producto: 'Stronghold' }
    ]
  },
  {
    id: '2',
    coloniaId: '1',
    nombre: 'Luna',
    color: 'gris',
    sexo: 'hembra',
    edad: 2,
    esterilizado: false,
    testado: false,
    enfermo: false,
    descripcionEnfermedad: '',
    embarazada: true,
    foto: '',
    desparasitaciones: []
  },
  {
    id: '3',
    coloniaId: '2',
    nombre: 'Naranja',
    color: 'naranja',
    sexo: 'macho',
    edad: 5,
    esterilizado: true,
    testado: true,
    enfermo: true,
    descripcionEnfermedad: 'Conjuntivitis',
    embarazada: false,
    foto: '',
    desparasitaciones: [
      { id: '2', fecha: '2024-02-10', producto: 'Advocate' }
    ]
  }
]

const STORAGE_KEY = 'gatos'

export function useGatos(coloniaId?: string) {
  // useState: guarda la lista de todos los gatos
  const [gatos, setGatos] = useState<Gato[]>([])

  // useState: guarda el filtro de estado seleccionado
  const [filtro, setFiltro] = useState<'todos' | 'esterilizado' | 'enfermo' | 'embarazada' | 'testado'>('todos')

  // useEffect: carga los gatos desde LocalStorage al montar el componente
  useEffect(() => {
    const datos = localStorage.getItem(STORAGE_KEY)
    if (datos) {
      setGatos(JSON.parse(datos))
    } else {
      setGatos(GATOS_EJEMPLO)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(GATOS_EJEMPLO))
    }
  }, [])

  // useMemo: filtra los gatos por colonia y por estado
  // Solo recalcula cuando cambian gatos, coloniaId o filtro
  const gatosFiltrados = useMemo(() => {
    let resultado = coloniaId
      ? gatos.filter(g => g.coloniaId === coloniaId)
      : gatos

    if (filtro === 'esterilizado') return resultado.filter(g => g.esterilizado)
    if (filtro === 'enfermo') return resultado.filter(g => g.enfermo)
    if (filtro === 'embarazada') return resultado.filter(g => g.embarazada)
    if (filtro === 'testado') return resultado.filter(g => g.testado)
    return resultado
  }, [gatos, coloniaId, filtro])

  // useCallback: añade un gato nuevo a una colonia
  const añadirGato = useCallback((nuevoGato: Omit<Gato, 'id'>) => {
    const gato: Gato = {
      ...nuevoGato,
      id: Date.now().toString()
    }
    setGatos(prev => {
      const actualizados = [...prev, gato]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados))
      return actualizados
    })
  }, [])

  // useCallback: actualiza los datos de un gato existente
  const actualizarGato = useCallback((id: string, cambios: Partial<Gato>) => {
    setGatos(prev => {
      const actualizados = prev.map(g => g.id === id ? { ...g, ...cambios } : g)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados))
      return actualizados
    })
  }, [])

  // useCallback: elimina un gato por su ID
  const eliminarGato = useCallback((id: string) => {
    setGatos(prev => {
      const actualizados = prev.filter(g => g.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados))
      return actualizados
    })
  }, [])

  return {
    gatos,
    gatosFiltrados,
    filtro,
    setFiltro,
    añadirGato,
    actualizarGato,
    eliminarGato
  }
}
