import axios, { Method } from 'axios';
import { getConfig } from '@/utils';

const {
  FEISHU_CONFIG: { FEISHU_URL },
} = getConfig();

export const request = async (url: string, option = {}) => {
  try {
    return axios.request({
      url: url,
      ...option,
    });
  } catch (error) {
    throw new Error(error);
  }
};

interface IMethodV {
  url: string;
  method?: Method;
  headers?: { [key: string]: string };
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

export interface IRequest {
  data: any;
  code: number;
}

/**
 * @description: 带 version 的通用 api 请求
 */
export const methodV = async ({
  url,
  method = 'GET',
  headers = {},
  params = {},
  query = {},
}): Promise<IRequest> => {
  let sendUrl = '';
  if (/^(http:\/\/|https:\/\/)/.test(url)) {
    sendUrl = url;
  } else {
    sendUrl = `${FEISHU_URL}${url}`;
  }
  try {
    return new Promise((resolve, reject) => {
      console.log({
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        url: sendUrl,
        method,
        params: query,
        data: {
          ...params,
        },
      });
      axios({
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        url: sendUrl,
        method,
        params: query,
        data: {
          ...params,
        },
      })
        .then(({ data, status }) => {
          resolve({ data, code: status });
        })
        .catch((error) => {
          reject(error);
        });
    });
  } catch (error) {
    throw new Error(error);
  }
};
