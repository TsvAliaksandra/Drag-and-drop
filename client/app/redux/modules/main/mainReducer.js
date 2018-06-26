import {UPLOAD_TO_LIST} from './mainActionConstants';

const defaultState = {
  listValue: [],
};

export default function (state = defaultState, {type, payload}) {
  switch (type) {
    case UPLOAD_TO_LIST:
      return {...state, listValue: payload};
    default:
      return state;
  }
}
