import { axiosPublic } from '../axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axiosPublic.get('/refresh', {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: res.data.accessToken,
        email: res.data.email,
      };
    });
    return res.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
