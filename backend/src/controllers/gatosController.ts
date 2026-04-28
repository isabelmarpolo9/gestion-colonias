import { Request, Response } from 'express'
import * as gatosService from '../services/gatosService'

type ReqWithId = Request<{ id: string }>

export function getGatos(req: Request, res: Response) {
  const gatos = gatosService.getGatos()
  res.status(200).json(gatos)
}

export function getGatoById(req: ReqWithId, res: Response) {
  const gato = gatosService.getGatoById(req.params.id)
  if (!gato) {
    res.status(404).json({ error: 'Gato no encontrado' })
    return
  }
  res.status(200).json(gato)
}

export function getGatosByColonia(req: ReqWithId, res: Response) {
  const gatos = gatosService.getGatosByColoniaId(req.params.id)
  res.status(200).json(gatos)
}

export function createGato(req: ReqWithId, res: Response) {
  const { nombre, color, sexo, edad } = req.body

  if (!nombre || !color || !sexo || edad === undefined) {
    res.status(400).json({ error: 'Nombre, color, sexo y edad son obligatorios' })
    return
  }

  if (sexo !== 'macho' && sexo !== 'hembra') {
    res.status(400).json({ error: 'El sexo debe ser macho o hembra' })
    return
  }

  const nuevo = gatosService.createGato({
    coloniaId: req.params.id,
    nombre,
    color,
    sexo,
    edad: Number(edad),
    esterilizado: false,
    testado: false,
    resultadoTest: null,
    enfermo: false,
    descripcionEnfermedad: '',
    embarazada: false,
    foto: '',
    desparasitaciones: []
  })

  res.status(201).json(nuevo)
}

export function updateGato(req: ReqWithId, res: Response) {
  const actualizado = gatosService.updateGato(req.params.id, req.body)
  if (!actualizado) {
    res.status(404).json({ error: 'Gato no encontrado' })
    return
  }
  res.status(200).json(actualizado)
}

export function deleteGato(req: ReqWithId, res: Response) {
  const eliminado = gatosService.deleteGato(req.params.id)
  if (!eliminado) {
    res.status(404).json({ error: 'Gato no encontrado' })
    return
  }
  res.status(200).json({ message: 'Gato eliminado correctamente' })
}