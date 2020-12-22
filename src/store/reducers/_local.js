import { app_name } from '../../consts';

/** localStorage data */
const STORAGE = `store-${app_name}`;
const storage = JSON.parse(localStorage.getItem(STORAGE)) || {};

export function handleLocal(name) {
  function getter(init = null) {
    // console.log('getter:', [name, storage[name], init]);
    if (name in storage) return storage[name];
    return setter(init);
  }
  function setter(value) {
    // console.log('setter:', [name, value]);
    storage[name] = value;
    localStorage.setItem(STORAGE, JSON.stringify(storage));
    // console.log('saved local:', [name, storage[name]]);
    return storage[name];
  }
  return [getter, setter];
}
