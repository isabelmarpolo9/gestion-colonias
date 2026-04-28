import { gatos, Gato } from '../config/data'

export function getGatos(): Gato[] {
  return gatos
}

export function getGatosByColoniaId(coloniaId: string): Gato[] {
  return gatos.filter(g => g.coloniaId === coloniaId)
}

export function getGatoById(id: string): Gato | undefined {
  return gatos.find(g => g.id === id)
}

export function createGato(datos: Omit<Gato, 'id'>): Gato {
  const nuevo: Gato = {
    ...datos,
    id: Date.now().toString()
  }
  gatos.push(nuevo)
  return nuevo
}

export function updateGato(id: string, datos: Partial<Gato>): Gato | undefined {
  const index = gatos.findIndex(g => g.id === id)
  if (index === -1) return undefined
  gatos[index] = { ...gatos[index], ...datos }
  return gatos[index]
}

export function deleteGato(id: string): boolean {
  const index = gatos.findIndex(g => g.id === id)
  if (index === -1) return false
  gatos.splice(index, 1)
  return true
}