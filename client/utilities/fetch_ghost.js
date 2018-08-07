import siteInfo from './../info.json';

export default function fetchGhost(ghostApiUrl, ghostApiOptions) {
  let url = ghost.url.api(ghostApiUrl, ghostApiOptions);
  if (process.env.NODE_ENV === 'development') {
    url = `${siteInfo.siteUrl}${url}`;
  }
  return fetch(url, {mode: 'cors'})
    .then(res => res.json())
    .then(res => res.posts ? res.posts : res);
}
