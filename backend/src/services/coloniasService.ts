import { colonias, Colonia } from '../config/data'

export function getColonias(): Colonia[] {
  return colonias
}

export function getColoniaById(id: string): Colonia | undefined {
  return colonias.find(c => c.id === id)
}

export function createColonia(datos: Omit<Colonia, 'id'>): Colonia {
  const nueva: Colonia = {
    ...datos,
    id: Date.now().toString()
  }
  colonias.push(nueva)
  return nueva
}

export function updateColonia(id: string, datos: Partial<Colonia>): Colonia | undefined {
  const index = colonias.findIndex(c => c.id === id)
  if (index === -1) return undefined
  colonias[index] = { ...colonias[index], ...datos }
  return colonias[index]
}

export function deleteColonia(id: string): boolean {
  const index = colonias.findIndex(c => c.id === id)
  if (index === -1) return false
  colonias.splice(index, 1)
  return true
}