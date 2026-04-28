import { Router } from 'express'
import * as gatosController from '../controllers/gatosController'

const router = Router()

router.get('/', gatosController.getGatos)
router.get('/:id', gatosController.getGatoById)
router.put('/:id', gatosController.updateGato)
router.delete('/:id', gatosController.deleteGato)

export default router