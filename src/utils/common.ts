/**
 * Returns a random number in a given interval
 *
 * @param min
 * @param max
 */
function getRandomNum(min = 1, max = 1000): number {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**
 * Returns true if the prototype for the `item` param solely comes from `Object`.
 *
 * @param item
 */
function isObject(item: any): boolean {
  return !!item && Object.prototype.toString.call(item) === '[object Object]';
}

/**
 * Returns true if the prototype for the `item` param solely comes from `Object`, and it has no keys.
 *
 * @param item
 */
function isEmpty(item: any): boolean {
  return isObject(item) && Object.keys(item).length === 0;
}

export {
  getRandomNum,
  isObject,
  isEmpty,
};
