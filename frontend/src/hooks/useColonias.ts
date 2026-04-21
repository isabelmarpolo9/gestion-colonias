import { useState, useMemo, useCallback } from 'react'
import type { Colonia } from '../types/index.ts'

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

// Función que inicializa el estado leyendo LocalStorage directamente
// Esto evita el problema de llamar setState dentro de useEffect
function cargarColonias(): Colonia[] {
  const datos = localStorage.getItem(STORAGE_KEY)
  if (datos) {
    return JSON.parse(datos)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(COLONIAS_EJEMPLO))
  return COLONIAS_EJEMPLO
}

export function useColonias() {
  // useState con función de inicialización lazy
  // La función cargarColonias solo se ejecuta una vez al montar el componente
  const [colonias, setColonias] = useState<Colonia[]>(cargarColonias)
  const [busqueda, setBusqueda] = useState('')

  const coloniasFiltradas = useMemo(() => {
    return colonias.filter(colonia =>
      colonia.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      colonia.direccion.toLowerCase().includes(busqueda.toLowerCase())
    )
  }, [colonias, busqueda])

  const añadirColonia = useCallback((nuevaColonia: Omit<Colonia, 'id'>) => {
    const colonia: Colonia = {
      ...nuevaColonia,
      id: Date.now().toString()
    }
    setColonias(prev => {
      const actualizadas = [...prev, colonia]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizadas))
      return actualizadas
    })
  }, [])

  const eliminarColonia = useCallback((id: string) => {
    setColonias(prev => {
      const actualizadas = prev.filter(c => c.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizadas))
      return actualizadas
    })
  }, [])

  return {
    colonias,
    coloniasFiltradas,
    busqueda,
    setBusqueda,
    añadirColonia,
    eliminarColonia
  }
}