import types from './types';
import { request } from '../utils/axios';

const USER_URL = '/api/user';
const POST_URL = '/api/post';

export async function getAllUser() {
  const data = await request('get', USER_URL + '/users', null);
  var uusers = [];
  var i;
  for (i = 0; i < data.length; i++) {
    uusers.push(Object.values(data[i]));
  }
  return {
    type: types.GET_ALL_USERS,
    payload: uusers,
  };
}

export async function getAllPost() {
  const data = await request('get', POST_URL + '/posts', null);
  var postlist = [];
  var i;
  for (i = 0; i < data.length; i++) {
    postlist.push(Object.values(data[i]));
  }
  return {
    type: types.GET_ALL_POSTS,
    payload: postlist,
  };
}

export function registerUser(dataToSubmit) {
  if (dataToSubmit['userID'] == '') {
    console.log("userID is none");
    return {
      type: types.REGISTER_USER,
      payload: '',
    };
  }
  request('post', USER_URL + '/register', dataToSubmit);
  return {
    type: types.REGISTER_USER,
    payload: '',
  };
}

export function modifyUser(dataToSubmit) {
  if (dataToSubmit['userID'] == '') {
    return {
      type: types.REGISTER_USER,
      payload: '',
    };
  }
  const data = request('post', USER_URL + '/modifyuser', dataToSubmit);
  return {
    type: types.MODIFY_USER,
    payload: data,
  };
}

export function registerPost(dataToSubmit) {
  if (dataToSubmit['userID'] == '') {
    console.log("userID is none");
    return {
      type: types.REGISTER_POST,
      payload: '',
    };
  }
  request('post', POST_URL + '/register', dataToSubmit);
  return {
    type: types.REGISTER_POST,
    payload: '',
  };
}

export function editPost(dataToSubmit) {
  request('post', POST_URL + '/edit', dataToSubmit);
  return {
    type: types.EDIT_POST,
    payload: '',
  };
}

export function userLogined(userdata) {
  return {
    type: types.USER_LOGINED,
    payload: userdata,
  };
}

export async function getCurrentPostsNumInfo() {
  const _data = await request('get', POST_URL + '/currentposts', null);
  const data = Object.values(_data);
  return {
    type: types.GET_CURRENT_POSTS_NUM_INFO,
    payload1: data[0],
    payload2: data[1],
  };
}

export function updatePostNum(dataToSubmit) {
  if (dataToSubmit['num_of_total_posts'] == '' || dataToSubmit['current_top_post_num'] == '') {
    console.log('data is none');
    return {
      type: types.UPDATE_POST_NUM,
      payload: '',
    }
  }
  request('post', POST_URL + '/updatepostnum', dataToSubmit);
  return {
    type: types.UPDATE_POST_NUM,
    payload1: dataToSubmit.num_of_total_posts,
    payload2: dataToSubmit.current_top_post_num,
  };
}

export function like(dataToSubmit) {
  request('post', POST_URL + '/like', dataToSubmit);
  return {
    type: types.LIKE,
    payload: '',
  };
}

export function unlike(dataToSubmit) {
  request('post', POST_URL + '/unlike', dataToSubmit);
  return {
    type: types.UNLIKE,
    payload: '',
  };
}

export async function getLikedPosts(dataToSubmit) {
  const data = await request('post', POST_URL + '/islike', dataToSubmit);
  console.log('likelist get from server : ' + Object.values(data))
  return {
    type: types.GET_LIKED_POSTS,
    payload: Object.values(data),
  };
}

// dataToDelete: uuid(key) of posts to delete
export async function deleteCheckedPosts(dataToDelete) {
  const data = await request('delete', POST_URL + '/deletepost', dataToDelete);
  console.log('deleted checked posts: ' + Object.values(dataToDelete));
  return {
    type: types.DELETE_CHECKED_POSTS,
    payload1: data[0], // num_of_total_posts
    payload2: data[1]  // current_top_post_num
  };
}