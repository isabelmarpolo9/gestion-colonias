import { Request, Response } from 'express'
import * as coloniasService from '../services/coloniasService'

type ReqWithId = Request<{ id: string }>

export function getColonias(req: Request, res: Response) {
  const colonias = coloniasService.getColonias()
  res.status(200).json(colonias)
}

export function getColoniaById(req: ReqWithId, res: Response) {
  const colonia = coloniasService.getColoniaById(req.params.id)
  if (!colonia) {
    res.status(404).json({ error: 'Colonia no encontrada' })
    return
  }
  res.status(200).json(colonia)
}

export function createColonia(req: Request, res: Response) {
  const { nombre, direccion, cuidador, coordenadas } = req.body
  if (!nombre || !direccion || !cuidador) {
    res.status(400).json({ error: 'Nombre, direccion y cuidador son obligatorios' })
    return
  }
  const nueva = coloniasService.createColonia({
    nombre,
    direccion,
    cuidador,
    coordenadas: coordenadas || { lat: 0, lng: 0 }
  })
  res.status(201).json(nueva)
}

export function updateColonia(req: ReqWithId, res: Response) {
  const actualizada = coloniasService.updateColonia(req.params.id, req.body)
  if (!actualizada) {
    res.status(404).json({ error: 'Colonia no encontrada' })
    return
  }
  res.status(200).json(actualizada)
}

export function deleteColonia(req: ReqWithId, res: Response) {
  const eliminada = coloniasService.deleteColonia(req.params.id)
  if (!eliminada) {
    res.status(404).json({ error: 'Colonia no encontrada' })
    return
  }
  res.status(200).json({ message: 'Colonia eliminada correctamente' })
}