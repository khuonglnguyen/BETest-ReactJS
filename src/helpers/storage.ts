export const setSessionItem = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionItem = (key: string): any => {
  let result: any;
  const dataString = sessionStorage.getItem(key);
  if (typeof dataString === 'string') result = JSON.parse(dataString);

  return result;
};

export const setLocalItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key: string): any => {
  let result: any;
  const dataString = localStorage.getItem(key);
  if (typeof dataString === 'string') result = JSON.parse(dataString);

  return result;
};
