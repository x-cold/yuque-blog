import axios from 'axios'

const API_HOST = 'https://www.yuque.com/api/v2';
const namespace = 'yinzhi/blog';

export function  getDetail (slug) {
    const api = `/api/yuque/ariticle/${slug}`;    
    return axios.get(api).then(res=>{ return res.data.data})
}


// export function  post (url) {
//     return axios.post(url)
// }