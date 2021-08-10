export const storage = {
  get: (key: string) => JSON.parse(localStorage.getItem(key)),
  set: (key: string, data) => localStorage.setItem(key, JSON.stringify(data)),
  remove: (key: string) => localStorage.removeItem(key),
};
