import { useState, useMemo, useCallback } from 'react'
import type { Gato } from '../types/index.ts'

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

function cargarGatos(): Gato[] {
  const datos = localStorage.getItem(STORAGE_KEY)
  if (datos) {
    return JSON.parse(datos)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(GATOS_EJEMPLO))
  return GATOS_EJEMPLO
}

export function useGatos(coloniaId?: string) {
  const [gatos, setGatos] = useState<Gato[]>(cargarGatos)
  const [filtro, setFiltro] = useState<'todos' | 'esterilizado' | 'enfermo' | 'embarazada' | 'testado'>('todos')

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

  const actualizarGato = useCallback((id: string, cambios: Partial<Gato>) => {
    setGatos(prev => {
      const actualizados = prev.map(g => g.id === id ? { ...g, ...cambios } : g)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados))
      return actualizados
    })
  }, [])

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