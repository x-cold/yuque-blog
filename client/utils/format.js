function formatTime(date) {
  date = date ? new Date(date) : new Date();
  return `${date.getFullYear()}/${date.getMonth() +
    1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
}

function formatDate(date) {
  date = date ? new Date(date) : new Date();
  return date.toLocaleDateString();
}

module.exports = {
  formatTime,
  formatDate,
};
