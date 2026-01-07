export async function api<T>(
  requestFn: () => Promise<T>,
  delay = 700
): Promise<T> {
  const delayFn = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms * Math.random()));

  await delayFn(delay);
  return await requestFn();
}
