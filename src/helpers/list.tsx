export function limit<T>(max: number) {
  return (value: T, index: number) => index < max;
}
