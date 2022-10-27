import { Router } from 'express';
import {
  getProcedures,
  getProcedureByID,
  insertProcedure,
  updateProcedureById,
  deleteProcedureById,
} from '../controllers/procedure.controller.js';

const router = Router();

router.get('/procedures/:id', getProcedures);
router
  .route('/procedure/:id')
  .get(getProcedureByID)
  .patch(updateProcedureById)
  .delete(deleteProcedureById);
router.post('/procedure', insertProcedure);

export default router;
