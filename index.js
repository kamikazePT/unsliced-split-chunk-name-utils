module.exports = ({ automaticNameDelimiter, automaticNamePrefix }) => {
  const cache = new WeakMap();
  const fn = (_module, chunks, cacheGroup) => {
    let cacheEntry = cache.get(chunks);
    if (cacheEntry === undefined) {
      cacheEntry = {};
      cache.set(chunks, cacheEntry);
    } else if (cacheGroup in cacheEntry) {
      return cacheEntry[cacheGroup];
    }
    const names = chunks.map(c => c.name);
    if (!names.every(Boolean)) {
      cacheEntry[cacheGroup] = undefined;
      return;
    }
    names.sort();
    const prefix = typeof automaticNamePrefix === "string" ? automaticNamePrefix : cacheGroup;
    const namePrefix = prefix ? prefix + automaticNameDelimiter : "";
    const name = namePrefix + names.join(automaticNameDelimiter);
    
    cacheEntry[cacheGroup] = name;
    return name;
  };
  return fn;
};