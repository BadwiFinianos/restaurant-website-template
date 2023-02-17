import { axiosInstance } from '../utils/AxiosInterceptor';

const SERVICE = 'general';
const MODEL = 'general';
const baseURL = process.env.REACT_APP_API_URL;

const getSettings = async () => axiosInstance.get(`${baseURL}/${SERVICE}/${MODEL}/settings`);

export { getSettings };
