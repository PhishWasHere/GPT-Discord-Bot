async function interleaveArrays(arr1, arr2) {
  const merged = [];
  const maxLength = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < arr1.length) {
      merged.push(arr1[i]);
    }
    if (i < arr2.length) {
      merged.push(arr2[i]);
    }
  }

  return merged;
}

module.exports = interleaveArrays;