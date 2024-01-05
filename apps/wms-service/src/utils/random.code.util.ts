export default function getCode(): number {
  return Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
}
