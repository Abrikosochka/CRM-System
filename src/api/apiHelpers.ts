export async function apiRequest<T>(
  requestFn: () => Promise<T>,
  fallbackMessage: string
): Promise<T> {
  try {
    return await requestFn();
  } catch (error) {
    if (error instanceof Error) throw new Error(fallbackMessage + ": " + error.message);
    throw new Error(fallbackMessage);
  }
}
