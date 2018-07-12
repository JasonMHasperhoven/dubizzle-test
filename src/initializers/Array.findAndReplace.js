/* eslint-disable */
Array.prototype.findAndReplace = function(callback, replacement) {
  const replaceIndex = this.findIndex(callback);

  if (replaceIndex === -1) {
    return this;
  }

  const newArray = [...this];

  if (typeof replacement === 'function') {
    newArray[replaceIndex] = replacement(this[replaceIndex]);
  } else {
    newArray[replaceIndex] = replacement;
  }

  return newArray;
};
