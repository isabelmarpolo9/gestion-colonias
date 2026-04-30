// client.ts
// Cliente de API tipado que se comunica con el backend
// Todas las peticiones al backend pasan por aqui

import type { Colonia, Gato, Desparasitacion } from '../types/index.ts'

// URL base del backend
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

// Funcion generica para hacer peticiones HTTP
// Gestiona los errores de red y los errores del servidor
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Error en la peticion')
  }

  return response.json()
}

// ============================================================
// COLONIAS
// ============================================================

export async function getColonias(): Promise<Colonia[]> {
  return request<Colonia[]>('/colonias')
}

export async function getColoniaById(id: string): Promise<Colonia> {
  return request<Colonia>(`/colonias/${id}`)
}

export async function createColonia(datos: Omit<Colonia, 'id'>): Promise<Colonia> {
  return request<Colonia>('/colonias', {
    method: 'POST',
    body: JSON.stringify(datos)
  })
}

export async function updateColonia(id: string, datos: Partial<Colonia>): Promise<Colonia> {
  return request<Colonia>(`/colonias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datos)
  })
}

export async function deleteColonia(id: string): Promise<void> {
  return request<void>(`/colonias/${id}`, {
    method: 'DELETE'
  })
}

// ============================================================
// GATOS
// ============================================================

export async function getGatosByColonia(coloniaId: string): Promise<Gato[]> {
  return request<Gato[]>(`/colonias/${coloniaId}/gatos`)
}

export async function getGatoById(id: string): Promise<Gato> {
  return request<Gato>(`/gatos/${id}`)
}

export async function createGato(coloniaId: string, datos: Omit<Gato, 'id' | 'coloniaId'>): Promise<Gato> {
  return request<Gato>(`/colonias/${coloniaId}/gatos`, {
    method: 'POST',
    body: JSON.stringify(datos)
  })
}

export async function updateGato(id: string, datos: Partial<Gato>): Promise<Gato> {
  return request<Gato>(`/gatos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datos)
  })
}

export async function deleteGato(id: string): Promise<void> {
  return request<void>(`/gatos/${id}`, {
    method: 'DELETE'
  })
}

export async function getGatos(): Promise<Gato[]> {
  return request<Gato[]>('/gatos')
}

// ============================================================
// DESPARASITACIONES
// ============================================================

export async function addDesparasitacion(gatoId: string, datos: Omit<Desparasitacion, 'id'>, gato: Gato): Promise<Gato> {
  const nuevaDesparasitacion: Desparasitacion = {
    ...datos,
    id: Date.now().toString()
  }
  return request<Gato>(`/gatos/${gatoId}`, {
    method: 'PUT',
    body: JSON.stringify({
      desparasitaciones: [...gato.desparasitaciones, nuevaDesparasitacion]
    })
  })
}