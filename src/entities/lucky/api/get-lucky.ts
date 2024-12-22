import axios from 'axios';

export const fetchLucky = async () => {
  const res = await axios.get('https://korean-advice-open-api.vercel.app/api/advice');
  return res.data;
};
