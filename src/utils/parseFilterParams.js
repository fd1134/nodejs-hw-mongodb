const parseContactType = (contactType) => {
  if (typeof contactType !== 'string') return;

  const isContactType = (value) =>
    ['work', 'home', 'personal'].includes(value);

  if (isContactType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;
  const value = isFavourite.toLowerCase();
  if (value === 'true') return true;
  if (value === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
