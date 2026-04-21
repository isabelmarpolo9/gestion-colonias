// AppContext.tsx
// Contexto global de la aplicación
// Comparte el estado de colonias y gatos entre todos los componentes

import { createContext, useContext, ReactNode } from 'react'
import { useColonias } from '../hooks/useColonias'
import { useGatos } from '../hooks/useGatos'

// Definimos el tipo del contexto
// Esto le dice a TypeScript qué datos y funciones estarán disponibles en el contexto
interface AppContextType {
  // Colonias
  colonias: ReturnType<typeof useColonias>['colonias']
  coloniasFiltradas: ReturnType<typeof useColonias>['coloniasFiltradas']
  busqueda: ReturnType<typeof useColonias>['busqueda']
  setBusqueda: ReturnType<typeof useColonias>['setBusqueda']
  añadirColonia: ReturnType<typeof useColonias>['añadirColonia']
  eliminarColonia: ReturnType<typeof useColonias>['eliminarColonia']
  // Gatos
  gatos: ReturnType<typeof useGatos>['gatos']
  gatosFiltrados: ReturnType<typeof useGatos>['gatosFiltrados']
  filtro: ReturnType<typeof useGatos>['filtro']
  setFiltro: ReturnType<typeof useGatos>['setFiltro']
  añadirGato: ReturnType<typeof useGatos>['añadirGato']
  actualizarGato: ReturnType<typeof useGatos>['actualizarGato']
  eliminarGato: ReturnType<typeof useGatos>['eliminarGato']
}

// Creamos el contexto con createContext
// El null es el valor por defecto, pero nunca se usará porque siempre lo envolveremos con el Provider
const AppContext = createContext<AppContextType | null>(null)

// El Provider es el componente que envuelve toda la app y comparte el estado
// Cualquier componente dentro del Provider puede acceder al contexto
interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  // Usamos los custom hooks que ya creamos
  // Al estar aquí en el Provider, los datos son compartidos por todos los componentes
  const coloniasHook = useColonias()
  const gatosHook = useGatos()

  const valor: AppContextType = {
    // Colonias
    colonias: coloniasHook.colonias,
    coloniasFiltradas: coloniasHook.coloniasFiltradas,
    busqueda: coloniasHook.busqueda,
    setBusqueda: coloniasHook.setBusqueda,
    añadirColonia: coloniasHook.añadirColonia,
    eliminarColonia: coloniasHook.eliminarColonia,
    // Gatos
    gatos: gatosHook.gatos,
    gatosFiltrados: gatosHook.gatosFiltrados,
    filtro: gatosHook.filtro,
    setFiltro: gatosHook.setFiltro,
    añadirGato: gatosHook.añadirGato,
    actualizarGato: gatosHook.actualizarGato,
    eliminarGato: gatosHook.eliminarGato,
  }

  return (
    <AppContext.Provider value={valor}>
      {children}
    </AppContext.Provider>
  )
}

// Hook personalizado para consumir el contexto fácilmente
// En lugar de escribir useContext(AppContext) en cada componente,
// escribimos useAppContext() que además comprueba que estamos dentro del Provider
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider')
  }
  return context
}