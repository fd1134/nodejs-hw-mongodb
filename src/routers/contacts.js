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
import { upload } from '../middlewares/multer.js';
import { createContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/',upload.single('photo'), validateBody(createContactSchema), ctrlWrapper(postContactController));
router.patch('/:contactId', isValidId,upload.single('photo'),ctrlWrapper(patchContactController));
router.delete('/:contactId',isValidId,ctrlWrapper(deleteContactController));

export default router;
