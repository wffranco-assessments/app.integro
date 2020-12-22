import { handleLocal } from './_local';

// Reducer Actions
const SAVE = 'token/save';

const [ getLocal, setLocal ] = handleLocal('token');
const init = getLocal();

// Reducer
export default function reducer(state = init, action = {}) {
  switch (action.type) {
    case SAVE: return setLocal(action.payload);
    default: return state;
  }
}

export const setToken = payload => dispatch => dispatch({type: SAVE, payload});
