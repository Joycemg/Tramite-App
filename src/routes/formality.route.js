import { Router } from 'express';
import {
  getFormalities,
  getFormalityByID,
  updateFormalityByID,
  deleteFormalityByID,
  insertFormality,
} from '../controllers/person.controller.js';

const router = Router();

router.get('/', getFormalities);
router
  .route('/formality/:id')
  .get(getFormalityByID)
  .put(updateFormalityByID)
  .delete(deleteFormalityByID);
router.post('/formality', insertFormality);

export default router;
