import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({ page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,  
  sortBy = '_id',
  filter = {}, }) =>  {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactQuery =  ContactsCollection.find();
  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }
 
  const [contactCount, contacts] = await Promise.all([
     ContactsCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact; 
};

export const postContact = async (contactData) => {
  const newContact = await ContactsCollection.create(contactData);
  return newContact;
};
export const patchContact = async (contactId, contactData) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(contactId, contactData, { new: true });
  return updatedContact;
};  

export const deleteContact = async (contactId) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);
  return deletedContact;
};