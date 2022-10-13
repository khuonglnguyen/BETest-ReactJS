import { useState } from 'react';
import { getLocalItem, setLocalItem } from '@helpers/storage';
import { COOKIES } from '@/constants/cookies';

export default function useToken() {
  const getToken = () => {
    const userToken = getLocalItem(COOKIES.TOKEN);
    return userToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    setLocalItem(COOKIES.TOKEN, userToken);
    setToken(userToken);
  };
  return {
    setToken: saveToken,
    token,
  };
}
