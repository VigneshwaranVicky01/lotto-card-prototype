export function getRandomDigitsFromArray(array, count = 6) {
  if (array.length < count) {
    throw new Error("Array doesn't contain enough unique elements.");
  }
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
