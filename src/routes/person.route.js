import { Router } from 'express';
import passport from 'passport';
import {
  addPerson,
  seePerson,
  eliminateThePerson,
  updatePersonalData,
  seePeople,
} from '../controllers/person.controller.js';

const jwt = passport.authenticate('jwt', { session: false });
const router = Router();

router.get('/people', jwt, seePeople);
router.post('/person', jwt, addPerson);
router
  .route('/person/:id')
  .get(jwt, seePerson)
  .delete(jwt, eliminateThePerson)
  .patch(jwt, updatePersonalData);

export default router;
