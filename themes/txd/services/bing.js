import axios from '../utils/axios';

export const getImgs = () => {
  const api = '/api/bing/imgs';
  return axios.get(api).then(res => res.data.data);
};

export default getImgs;
