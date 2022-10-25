import { Router } from 'express';
import {
  getPeople,
  getPersonByID,
  deletePersonByID,
  updatePersonByEmail,
  register,
  // login,
} from '../controllers/person.controller.js';

const router = Router();

router.get('/people', getPeople);
router.route('/person/:id').get(getPersonByID).delete(deletePersonByID).patch(updatePersonByEmail);
router.post('/register', register);
// router.post('/login', login);

export default router;
