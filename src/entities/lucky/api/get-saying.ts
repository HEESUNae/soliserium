import axios from 'axios';

export const fetcSaying = async () => {
  const res = await axios.get('https://korean-advice-open-api.vercel.app/api/advice');
  return res.data;
};
