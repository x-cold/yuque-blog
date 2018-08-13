import axios from '../utils/axios';

export const getDetail = (slug) => {
  const api = `/api/yuque/ariticle/${slug}`;
  return axios.get(api).then(res => res.data.data);
};

export const getList = () => {
  const api = '/api/yuque/ariticles';
  return axios.get(api).then(res => res.data.data);
};

export const getToc = () => {
  const api = '/api/yuque/ariticleToc';
  return axios.get(api).then(res => res.data.data);
};
