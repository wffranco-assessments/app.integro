import { api_url } from '../consts';

let config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
};

const json = (() => {
  async function ajax(input, init) {
    if (init && 'body' in init && instance(init.body) !== String) init.body = JSON.stringify(init.body);
    const response = await fetch(url(input), deepMerge([{}, config, init]));
    const { ok, status, statusText } = response;
    const body = await response.json();
    const result = { body, ok, status, statusText };
    if (Math.floor(status/100) !== 2) throw new FetchError(result);
    return result;
  }
  ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].forEach(method => ajax[method.toLowerCase()] = (
    (resource, options = {}) => ajax(resource, deepMerge([options, {method}]))
  ));
  return ajax;
})();

/** dispatchable api with token. */
export const api = d => d((dispatch, getState) => {
  const token = getState instanceof Function ? getState().token : getState;
  if (token) {
    setOptions({headers: {
      Authorization: `Bearer ${token}`,
    }});
  }
  return json;
});

export const cleanSession = d => d((dispatch, getState) => {
  const {user, token} = getState();
  if (user) dispatch({type: 'user/save', payload: null});
  if (token) dispatch({type: 'token/save', payload: null});
});

export function setOptions(values, clean = false) {
  config = clean ? values : deepMerge([config, values]);
}

function instance(item) {
  if (item instanceof Array) return Array;
  if (item instanceof Function) return Function;
  if (item === null) return null;
  if (item === undefined) return undefined;
  switch (typeof item) {
    case 'boolean': return Boolean;
    case 'string': return String;
    case 'number': return Number;
    case 'symbol': return Symbol;
    case 'object': return Object;
    default: return undefined;
  }
}

function url(path) {
  if (instance(path) !== String || /^\w+:\/\//.test(path)) return path;

  const trim = path.replace(/^\/|\/$/g, '').replace(/\/\/+/g, '/');
  return `${api_url}/${trim}`;
}

function deepMerge([a, ...more], types = [Array, Object]) {
  if (!more.length) return a;
  return more.reduce((a, b) => {
    if (instance(a) !== instance(b)) return b;

    if (instance(a) === Object) {
      if (!types.includes(Object)) return b;
      for (const el in b) {
        if (el in a) a[el] = deepMerge([{}, a[el], b[el]]);
        else a[el] = instance(b[el]) === Object ? {...b[el]} : b[el];
      }
      return a;
    }

    if (instance(a) === Array) {
      return types.includes[Array] ? a.concat(b) : b;
    }

    return b;
  }, a);
}

function FetchError({ status, statusText, body }) {
  this.message = `Error ${status}: ${statusText}`;
  this.body = body;
  this.status = status;
}
