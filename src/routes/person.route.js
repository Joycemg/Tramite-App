import { Router } from 'express';
import {
  getPeople,
  getPersonByID,
  deletePersonByID,
  updatePersonByID,
  register,
  login,
} from '../controllers/person.controller.js';

const router = Router();

router.get('/people', getPeople);
router.route('/person/:id').get(getPersonByID);
// .put(updatePersonByID)
// .delete(deletePersonByID);
router.post('/register', register);
router.post('/login', login);

export default router;
