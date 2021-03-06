/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line react/react-in-jsx-scope
import { BrowserRouter, Route } from 'react-router-dom';
import PostMain from './page/PostMain';
import PostView from './component/PostView';
import Join from './page/Join';
import Landing from './page/Landing'
import PostWrite from './page/PostWrite';
import MyPagePost from './page/MyPagePost';
import MyPageLike from './page/MyPageLike';
import MyPageComment from './page/MyPageComment';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={Landing} />
        <Route exact path='/postView/:no' component={PostView} />
        <Route exact path='/postMain/:pageNO' component={PostMain} />
        <Route exact path='/Join/' component={Join} />
        <Route exact path='/postWrite/' component={PostWrite} />
        <Route exact path='/myPage/myPosts/:pageNO' component={MyPagePost} />
        <Route exact path='/myPage/myLikes/:pageNO' component={MyPageLike} />
        <Route exact path='/myPage/myComments/:pageNO' component={MyPageComment} />
      </BrowserRouter>
    </div>
  );
}
 
export default App;