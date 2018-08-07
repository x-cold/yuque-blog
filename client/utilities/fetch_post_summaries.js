import fetchGhost from './fetch_ghost';

const summaryFields = [
  'tags',
  'meta_title',
  'meta_description',
  'slug',
  'title',
  'published_at',
  'image'
];

export default function fetchPostSummaries() {
  // Cannot both filter and include fields (currently in Ghost Beta)
  return fetchGhost('posts', {
    'include': 'tags',
    'limit': 100,
    //'fields': summaryFields.join(',')
  });
}
