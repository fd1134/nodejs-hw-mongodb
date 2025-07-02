import createHttpError from 'http-errors';

import { getAllContacts, getContactById,postContact , patchContact,deleteContact} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';


export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;
  const contacts = await getAllContacts({  page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId
  });

  if (!contacts) {
    throw createHttpError(404, 'No contacts found');
  }

  res.json({
    status: 200,
    message: 'Successfully retrieved all contacts!',
    data: contacts,
  });
};
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;
  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });       
  res.json({  
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const postContactController = async (req, res) => {
  const contactData = req.body;

  if (!contactData || Object.keys(contactData).length === 0) {
    throw createHttpError(400, 'Contact data is required');
  }

  const newContact = await postContact({ ...contactData, userId: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a new contact!',
    data: newContact,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const contactData = req.body;
  const userId = req.user._id;

  if (!contactData || Object.keys(contactData).length === 0) {
    throw createHttpError(400, 'Contact data is required');
  }

  const updatedContact = await patchContact(contactId, contactData,userId);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: updatedContact,
  });
};
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const deletedContact = await deleteContact(contactId, userId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};