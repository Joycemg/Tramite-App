import { Router } from 'express';
import passport from 'passport';
import {
  seeProcedures,
  seeProcedure,
  insertProcedure,
  updateProcedureById,
  deleteProcedureById,
} from '../controllers/procedure.controller.js';

const router = Router();
const jwt = passport.authenticate('jwt', { session: false });

router.get('/procedures', seeProcedures, jwt);
router
  .route('/procedure/:id')
  .get(jwt, seeProcedure)
  .patch(jwt, updateProcedureById)
  .delete(jwt, deleteProcedureById)
  .post(jwt, insertProcedure);

export default router;
