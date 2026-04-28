import { Router } from 'express'
import * as coloniasController from '../controllers/coloniasController'
import * as gatosController from '../controllers/gatosController'

const router = Router()

// Rutas de colonias
router.get('/', coloniasController.getColonias)
router.get('/:id', coloniasController.getColoniaById)
router.post('/', coloniasController.createColonia)
router.put('/:id', coloniasController.updateColonia)
router.delete('/:id', coloniasController.deleteColonia)

// Rutas de gatos dentro de una colonia
router.get('/:id/gatos', gatosController.getGatosByColonia)
router.post('/:id/gatos', gatosController.createGato)

export default router