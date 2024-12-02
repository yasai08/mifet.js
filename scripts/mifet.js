Promise.prototype.t = Promise.prototype.then;
Promise.prototype.c = Promise.prototype.catch;
Promise.prototype.f = Promise.prototype.finally;

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

async function request(url, method = 'GET', body = null, options = {}, timeout = 5000, retries = 3) {
  const controller = new AbortController();
  const signal = controller.signal;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const config = {
    ...defaultOptions,
    ...options,
    method,
    body: body ? JSON.stringify(body) : null,
    signal,
  };

  const timer = setTimeout(() => controller.abort(), timeout);

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, { ...config, signal });
      clearTimeout(timer);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      clearTimeout(timer);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }

      if (attempt < retries - 1) {
        console.warn(`Retrying... attempt ${attempt + 1}`);
      } else {
        console.error('Fetch error:', error);
        throw error;
      }
    }
  }
}

export const get = (url, options = {}, retries = 3, timeout = 5000) => request(url, 'GET', null, options, timeout, retries);
export const post = (url, body, options = {}, retries = 3, timeout = 5000) => request(url, 'POST', body, options, timeout, retries);
export const put = (url, body, options = {}, retries = 3, timeout = 5000) => request(url, 'PUT', body, options, timeout, retries);
export const del = (url, options = {}, retries = 3, timeout = 5000) => request(url, 'DELETE', null, options, timeout, retries);
