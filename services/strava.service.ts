import axios from 'axios';

export function stravaService(config: {
  authorization?: string;
  baseURL: string;
}) {
  const { baseURL, authorization } = config;

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      ...(authorization && { Authorization: `Bearer ${authorization}` }),
    },
  });

  function connect(code: string) {
    return axiosInstance.post('/strava/connect', {
      code,
    });
  }

  function disconnect() {
    return axiosInstance.post('/strava/disconnect');
  }

  function sync() {
    return axiosInstance.post('/strava/sync');
  }

  return {
    connect,
    disconnect,
    sync,
  };
}

export default stravaService;
