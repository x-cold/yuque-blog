/**
 * Change the scroll axis.
 * @param {Node Event} [eve]
 */
function horizontalWheel(eve) {
  if (eve.preventDefault) {
    eve.preventDefault();
  }
  this.scrollLeft += eve.deltaY;
}

/**
 * Scroll horizontally with mouse wheel over a given Node Element.
 * @param {Node Element} [node] - A Node Element.
 * @returns {Node Element}
 */
function horwheel(node, cb) {
  if (!node) {
    return false;
  }
  const fn = function (e) {
    let result;
    if (typeof cb === 'function') {
      result = cb(e);
    }
    if (result === false) {
      return;
    }
    horizontalWheel.bind(node)(e);
  };
  node.addEventListener('wheel', fn, false);
  return {
    remove() {
      node.removeEventListener('wheel', fn);
    },
  };
}

/**
 * Expose horwheel
 */
module.exports = horwheel;
