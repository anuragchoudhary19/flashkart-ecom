import axios from 'axios';

export const getAllDBs = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/databases`);
};
