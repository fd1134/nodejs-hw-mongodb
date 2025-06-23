import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  postContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts', validateBody(createContactSchema), ctrlWrapper(postContactController));
router.patch('/contacts/:contactId', isValidId,ctrlWrapper(patchContactController));
router.delete('/contacts/:contactId',isValidId,ctrlWrapper(deleteContactController));

export default router;
