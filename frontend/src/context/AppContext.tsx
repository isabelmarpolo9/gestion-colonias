import { createContext, useContext, ReactNode } from 'react'
import { useColonias } from '../hooks/useColonias'
import { useGatos } from '../hooks/useGatos'

interface AppContextType {
  colonias: ReturnType<typeof useColonias>['colonias']
  coloniasFiltradas: ReturnType<typeof useColonias>['coloniasFiltradas']
  busqueda: ReturnType<typeof useColonias>['busqueda']
  setBusqueda: ReturnType<typeof useColonias>['setBusqueda']
  añadirColonia: ReturnType<typeof useColonias>['añadirColonia']
  eliminarColonia: ReturnType<typeof useColonias>['eliminarColonia']
  loadingColonias: boolean
  errorColonias: string | null
  gatos: ReturnType<typeof useGatos>['gatos']
  gatosFiltrados: ReturnType<typeof useGatos>['gatosFiltrados']
  filtro: ReturnType<typeof useGatos>['filtro']
  setFiltro: ReturnType<typeof useGatos>['setFiltro']
  añadirGato: ReturnType<typeof useGatos>['añadirGato']
  actualizarGato: ReturnType<typeof useGatos>['actualizarGato']
  eliminarGato: ReturnType<typeof useGatos>['eliminarGato']
  loadingGatos: boolean
  errorGatos: string | null
}

const AppContext = createContext<AppContextType | null>(null)

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const coloniasHook = useColonias()
  const gatosHook = useGatos()

  const valor: AppContextType = {
    colonias: coloniasHook.colonias,
    coloniasFiltradas: coloniasHook.coloniasFiltradas,
    busqueda: coloniasHook.busqueda,
    setBusqueda: coloniasHook.setBusqueda,
    añadirColonia: coloniasHook.añadirColonia,
    eliminarColonia: coloniasHook.eliminarColonia,
    loadingColonias: coloniasHook.loading,
    errorColonias: coloniasHook.error,
    gatos: gatosHook.gatos,
    gatosFiltrados: gatosHook.gatosFiltrados,
    filtro: gatosHook.filtro,
    setFiltro: gatosHook.setFiltro,
    añadirGato: gatosHook.añadirGato,
    actualizarGato: gatosHook.actualizarGato,
    eliminarGato: gatosHook.eliminarGato,
    loadingGatos: gatosHook.loading,
    errorGatos: gatosHook.error,
  }

  return (
    <AppContext.Provider value={valor}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider')
  }
  return context
}