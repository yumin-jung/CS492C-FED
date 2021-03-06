import types from '../actions/types';

const initialstate = {
  loginUser: {},
  userList: [],
  postList: [],
  commentList: [],
  myPostList: [],
  myLikeList: [],
  myCommentList: [],
  postPerPage: 20,
  currentPage: 1,
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case types.REGISTER_USER: 
      return state;
    case types.REGISTER_POST: 
      return {...state, postList: action.payload};
    case types.EDIT_POST:
      return state;
    case types.MODIFY_USER:
      return state;
    case types.GET_ALL_USERS:
      return {...state, userList: action.payload};
    case types.GET_ALL_POSTS:
      return {...state, postList: action.payload};
    case types.USER_LOGINED:
      return {...state, loginUser: action.payload};
    case types.UPDATE_POST_NUM:
      return {...state, num_of_total_posts: action.payload1, current_top_post_num: action.payload2};
    case types.GET_MY_POSTS:
      return {...state, myPostList: action.payload}
    case types.GET_MY_LIKED_POSTS:
      return {...state, myLikeList: action.payload}
    case types.GET_PAGINATION_INFO:
      return {...state }
    case types.SET_POST_PER_PAGE:
      return {...state, postPerPage: action.payload}
    case types.SET_CURRENT_PAGE:
      return {...state, currentPage: action.payload}
    default:
      return state;
  }
}
