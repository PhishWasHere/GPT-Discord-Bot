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
// function merges arrays by alternating between them
//eg arr1 = [{1}, {3}, {5}] + arr2 = [{2}, {4}] = [{1}, {2}, {3}, {4}, {5}]
module.exports = interleaveArrays;