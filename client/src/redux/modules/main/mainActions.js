import {UPLOAD_TO_LIST} from './mainActionConstants';

export const uploadToList = value => (dispatch, getState) => {
  const listValue = [...getState().main.listValue];

  dispatch({
    type: UPLOAD_TO_LIST,
    payload: [...listValue, value],
  });
};
