export function generateObjectId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16); // 4-byte timestamp
  const random = Math.random().toString(16).substring(2, 8); // 5 bytes of randomness
  const counter = Math.floor(Math.random() * 0xffffff).toString(16); // 3-byte counter

  // Pad random and counter to ensure correct length
  return timestamp + random.padStart(8, '0') + counter.padStart(6, '0');
}
