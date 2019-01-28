/**
 * Created by yi.dai on 2018/3/29.
 */
import {
  GET_DOC_LIST_SUCCESS, GET_DOC_SUCCESS, SAVE_DOC_SUCCESS, EDIT_DOC_SUCCESS, DELETE_DOC_SUCCESS
} from 'action';

const docReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DOC_LIST_SUCCESS:
      return { ...state, 'docList': action.data };
    case GET_DOC_SUCCESS:
      return { ...state, 'docFile': action.data };
    case SAVE_DOC_SUCCESS:
      return { ...state, 'save': action.data };
    case EDIT_DOC_SUCCESS:
      return { ...state, 'edit': action.data };
    case DELETE_DOC_SUCCESS:
      return { ...state, 'delete': action.data };
    default:
      return state;
  }
};

export default docReducer;
