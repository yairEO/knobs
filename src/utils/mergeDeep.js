function mergeDeep(...objects) {
  const isObject = obj => obj && typeof obj === 'object'

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach(key => {
      var pVal = prev[key], oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal))
        prev[key] = pVal.concat(...oVal);

      else
        prev[key] = (isObject(pVal) && isObject(oVal))
          ? mergeDeep(pVal, oVal)
          : oVal;
    })

    return prev
  }, {});
}

export default mergeDeep