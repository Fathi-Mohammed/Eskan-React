export const buildQueryString = (data) => {
  const queryParts = Object.entries(data)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`);

  return queryParts.join('&');
};
