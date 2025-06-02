import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
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