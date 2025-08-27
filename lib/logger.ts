export const log = (...args: unknown[]) => {
  if (__DEV__) console.log('[LOG]', ...args);
};
export const warn = (...args: unknown[]) => {
  if (__DEV__) console.warn('[WARN]', ...args);
};
export const error = (...args: unknown[]) => {
  if (__DEV__) console.error('[ERROR]', ...args);
};
