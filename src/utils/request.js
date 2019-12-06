import { useReducer } from 'react';
import axios from 'axios';
import { Message } from '@alifd/next';

// Set baseURL when debugging production url in dev mode
axios.defaults.baseURL = 'http://dapi.playhudong.com';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // 如果token存在, 则添加到请求头
  const token = localStorage.getItem('token');
  if (token && token.length > 256) {
    console.log('add request header Authorization');
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const token = error.response.headers.authorization;
  switch (error.response.status) {
    // 如果响应中的 http code 为 401，那么则此用户可能 token 失效了之类的，我会触发 logout 方法，清除本地的数据并将用户重定向至登录页面
    case 401:
      // 自动刷新token
      if (token) {
        localStorage.setItem('token', token);
        location.href = '';
      } else {
        localStorage.setItem('token', null);
        location.href = '#/user/login';
      }

      break;
      // 如果响应中的 http code 为 400，那么就弹出一条错误提示给用户
    case 500:
      location.href = '#/user/login';

      break;
    default:
      console.error('error is ', error);
  }

  return Promise.reject(error);
});

/**
 * Method to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object} response data
 */
export async function request(options) {
  try {
    const response = await axios(options);
    const { data, error } = handleResponse(response);
    if (error) {
      throw error;
    } else {
      console.log('response: ', response);

      return { response, data};
    }
  } catch (error) {
    showError(error.message);
    // throw error;

    return Promise.reject(error);
  }
}


/**
 * Hooks to make ajax request
 *
 * @param {object} options - axios config (https://github.com/axios/axios#request-config)
 * @return {object}
 *   @param {object} response - response of axios (https://github.com/axios/axios#response-schema)
 *   @param {object} error - HTTP or use defined error
 *   @param {boolean} loading - loading status of the request
 *   @param {function} request - function to make the request manually
 */
export function useRequest(options) {
  const initialState = {
    response: null,
    loading: false,
    error: null,
  };
  const [state, dispatch] = useReducer(requestReducer, initialState);

  /**
   * Method to make request manually
   * @param {object} config - axios config to shallow merged with options before making request
   */
  async function request(config) {
    try {
      dispatch({
        type: 'init',
      });

      const response = await axios({
        ...options,
        ...config,
      });
      console.log('response is ', response);
      const { error } = handleResponse(response);

      if (error) {
        throw error;
      } else {
        dispatch({
          type: 'success',
          response,
        });
      }
    } catch (error) {
      console.error(error);
      showError(error.message);
      dispatch({
        type: 'error',
        error,
      });
    }
  }

  return { ...state, request };
}

/**
 * Reducer to handle the status of the request
 * @param {object} state - original status
 * @param {object} action - action of dispatch
 * @return {object} new status
 */
function requestReducer(state, action) {
  switch (action.type) {
    case 'init':
      return {
        repsonse: null,
          error: null,
          loading: true,
      };
    case 'success':
      return {
        response: action.response,
          error: null,
          loading: false,
      };
    case 'error':
      return {
        response: null,
          error: action.error,
          loading: false,
      };
    default:
      return {
        repsonse: null,
          error: null,
          loading: false,
      };
  }
}

/**
 * Custom response data handler logic
 *
 * @param {object} response - response data returned by request
 * @return {object} data or error according to status code
 */
function handleResponse(response) {
  const { data } = response;
  // Please modify the status key according to your business logic
  // normally the key is `status` or `code`
  if (response.status >= 200 && response.status < 400) {
    return { data };
  } else if (response.status === 401) {
    console.log('response.status is ', response.status);
  } else {
    const error = new Error(data.message || data.error || '网络异常, 请稍后再试');

    return { error };
  }
}

/**
 * Display error message
 *
 * @param {string} errorMessage - error message
 */
function showError(errorMessage) {
  Message.show({
    type: 'error',
    title: '错误消息',
    content: errorMessage,
  });
}
