// useColonias.ts
// Custom hook que gestiona todo lo relacionado con las colonias
// Agrupa useState, useEffect, useMemo y useCallback en un solo lugar reutilizable

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Colonia } from '../types/index'

// Datos de ejemplo para que la app tenga contenido desde el principio
const COLONIAS_EJEMPLO: Colonia[] = [
  {
    id: '1',
    nombre: 'Colonia del Parque',
    direccion: 'Parque Grande, Zaragoza',
    cuidador: 'Isabel',
    coordenadas: { lat: 41.6488, lng: -0.8891 }
  },
  {
    id: '2',
    nombre: 'Colonia de la Plaza',
    direccion: 'Plaza del Pilar, Zaragoza',
    cuidador: 'Ana',
    coordenadas: { lat: 41.6561, lng: -0.8773 }
  },
  {
    id: '3',
    nombre: 'Colonia del Río',
    direccion: 'Paseo Echegaray, Zaragoza',
    cuidador: 'María',
    coordenadas: { lat: 41.6518, lng: -0.8762 }
  }
]

const STORAGE_KEY = 'colonias'

export function useColonias() {
  // useState: guarda la lista de colonias
  // Cuando cambia, React vuelve a renderizar los componentes que usan este hook
  const [colonias, setColonias] = useState<Colonia[]>([])

  // useState: guarda un texto de búsqueda para filtrar colonias
  const [busqueda, setBusqueda] = useState('')

  // useEffect: se ejecuta una sola vez cuando la app arranca
  // Carga las colonias desde LocalStorage, o usa los datos de ejemplo si no hay nada guardado
  useEffect(() => {
    const datos = localStorage.getItem(STORAGE_KEY)
    if (datos) {
      setColonias(JSON.parse(datos))
    } else {
      setColonias(COLONIAS_EJEMPLO)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(COLONIAS_EJEMPLO))
    }
  }, []) // El array vacío [] significa "ejecuta esto solo una vez al montar el componente"

  // useMemo: filtra las colonias según el texto de búsqueda
  // Solo recalcula el filtro cuando cambian 'colonias' o 'busqueda'
  // Sin useMemo, este filtro se recalcularía en cada render aunque los datos no hayan cambiado
  const coloniasFiltradas = useMemo(() => {
    return colonias.filter(colonia =>
      colonia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      colonia.direccion.toLowerCase().includes(busqueda.toLowerCase())
    )
  }, [colonias, busqueda])

  // useCallback: función para añadir una colonia nueva
  // Se memoriza para no recrearla en cada render
  // Sin useCallback, los componentes hijos que reciben esta función se rerenderizarían innecesariamente
  const añadirColonia = useCallback((nuevaColonia: Omit<Colonia, 'id'>) => {
    const colonia: Colonia = {
      ...nuevaColonia,
      id: Date.now().toString() // Generamos un ID único basado en la fecha actual
    }
    setColonias(prev => {
      const actualizadas = [...prev, colonia]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizadas))
      return actualizadas
    })
  }, [])

  // useCallback: función para eliminar una colonia por su ID
  const eliminarColonia = useCallback((id: string) => {
    setColonias(prev => {
      const actualizadas = prev.filter(c => c.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizadas))
      return actualizadas
    })
  }, [])

  // Devolvemos todo lo que los componentes necesitan
  return {
    colonias,
    coloniasFiltradas,
    busqueda,
    setBusqueda,
    añadirColonia,
    eliminarColonia
  }
}
