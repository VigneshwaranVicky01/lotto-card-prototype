export function getRandomDigitsFromArray(array, count = 6) {
  if (array.length < count) {
    throw new Error("Array doesn't contain enough unique elements.");
  }
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const names = [
  'Lucky Picks',
  'Golden Numbers',
  'Treasure Tickets',
  'Luxe Lotto',
  'Luxe Ticket',
  'Mystic Numbers',
  'Goldline Tickets',
  'Jackpot Royale',
];

export function getRandomString(names) {
  if (!Array.isArray(names) || names.length === 0) {
    throw new Error('Please provide a non-empty array.');
  }
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}
