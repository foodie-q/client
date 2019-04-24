module.exports = (number, showRP = true) => {
  number = ('' + number || '').replace(/[^0-9]/, '').replace(/^0+/, '');
  return (showRP ? 'Rp.' : '') + (number + '' || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
};
