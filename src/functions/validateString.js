export const validate = (string) => {
  if (string === '' || /^\s+$/.test(string)) {
    return 'Name cannot be empty';
  } else if (/^[0-9]+$/.test(string)) {
    return 'Name cannot start with number';
  } else if (string.length > 32) {
    return 'Name cannot be longer than 32 characters';
  } else if (string.length < 2) {
    return 'Name cannot be longer than 32 characters';
  } else {
    return 'valid';
  }
};
export const validateEmail = (string) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(string)) {
    return true;
  } else {
    return false;
  }
};
