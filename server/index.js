/* eslint-disable array-callback-return */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
/* eslint-disable consistent-return */
/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
// eslint-disable-next-line no-undef
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;
const dbAddress = 'mongodb+srv://dain:1234@cluster0.hq96u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const { User } = require('./models/User');
const { Post } = require('./models/Post');
const { CurrentPosts } = require('./models/CurrentPosts');
const { Comment } = require('./models/Comment');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cors({ credentials: true, origin: 'http://localhost:6006' }));
app.use('/api/comment', require('./routes/comment'));

app.listen(port, () => {
  console.log('서버가 가동중입니다');
});

mongoose
  .connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.post('/api/post/register', async (req, res) => {
  var postList = mongoose.model('Post');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);

  const post = new Post(req.body);
  if (post.postNO === '') {
    return res.status(200).json({ success: false, err });
  }
  postList.findOne({ postNO: post.postNO }, function (err, samePost) {
    if (err) {
      return res.json({ success: false, err });
    }
    if (samePost != null) {
      console.log('same postNO');
      return res.json({ success: false, err });
    }
  });
  var currentPostsInfo = mongoose.model('CurrentPosts');
  currentPostsInfo.findOneAndUpdate({}, { $inc: { current_top_post_num: 1, num_of_total_posts: 1 } }, (err) => {
    if (err) return res.json({ success: false, err });
  });
  post.save(async (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    console.log('save post');
    const posts = await Post.find({});
    return res.json(posts);
  });
});

app.post('/api/post/edit', async (req, res) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  const post = new Post(req.body);
  var postList = mongoose.model('Post');

  postList.findOneAndUpdate({ postNO: post.postNO }, { title: post.title, created_date: post.created_date, content: post.content }, (err) => {
    if (err) return res.json({ success: false, err });
    console.log('edit post');
  });
});

app.post('/api/user/register', async (req, res) => {
  var userList = mongoose.model('User');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);

  const user = new User(req.body);
  if (user.userName === '') {
    return res.status(200).json({ success: true });
  }
  userList.findOne({ userID: user.userID }, function (err, sameUser) {
    if (err) {
      return res.json({ success: false, err });
    }
    if (sameUser != null) {
      console.log('same user');
      return res.json(
        {
          userID: user.userID,
          password: user.password,
        },
      );
    }
  });
  user.save((err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    console.log('save user');
    return res.status(200).json(
      {
        userID: user.userID,
        password: user.password,
      },
    );
  });
});

app.get('/api/user/users', async (req, res) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);

  const users = await User.find({});
  res.json(users);
});

app.get('/api/post/posts', async (req, res) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  console.log('getallpost');
  const posts = await Post.find({});
  res.json(posts);
});

app.post('/api/post/myposts', async (req, res) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  console.log('getmyposts');
  const myposts = await Post.find({ userID: req.body.userID });
  res.json(myposts);
});

app.post('/api/post/mylikes', async (req, res) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  const user = await User.findOne({ userID: req.body.userID });
  var postList = mongoose.model('Post');
  console.log('getmylikes');
  const likepostlist = await postList.find({ likeUsers: user.userID });
  res.json(likepostlist);
});

app.post('/api/post/mycomments', async (req, res) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  console.log('getmycomments');
  const mycomments = await Comment.find({ writer: req.body.userID });
  res.json(mycomments);
});

app.get('/api/post/currentposts', async (req, res) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  console.log('getcurrentposts');
  const currentposts = await CurrentPosts.find({});
  res.json({
    num_of_total_posts: currentposts[0].num_of_total_posts,
    current_top_post_num: currentposts[0].current_top_post_num,
  });
});

app.post('/api/post/updatepostnum', async (req, res) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  console.log('updatepostnum');
  const currentPost = new CurrentPosts(req.body);
  console.log('numoftotal : ' + currentPost.num_of_total_posts);
  console.log('currenttoppostnum : ' + currentPost.current_top_post_num);
  var currentPostsInfo = mongoose.model('CurrentPosts');
  currentPostsInfo.findOneAndUpdate({}, { num_of_total_posts: currentPost.num_of_total_posts, current_top_post_num: currentPost.current_top_post_num }, (err) => {
    if (err) return res.json({ success: false, err });
  });
});

app.post('/api/querycomment', async (req, res) => {
  res.set('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  const queriedComment = await Comment.find({ content: { $regex: req.body.queryString } });
  res.json(queriedComment);
});

// for socket io
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
  pingInterval: 2000,
  pingTimeout: 6000000,
});

io.on('connection', (socket) => {
  console.log('connection');
  socket.on('like-snd', (item) => {
    var postList = mongoose.model('Post');
    postList.findOne({ postNO: item.postNO }, function (err, samePost) {
      if (err) return res.json({ success: false, err });
      if (samePost != null) {
        samePost.addLike(item.userID);
        console.log('like');
      }
    });
    io.emit('like-rcv', item);
  });
  socket.on('unlike-snd', (item) => {
    var postList = mongoose.model('Post');
    postList.findOne({ postNO: item.postNO }, function (err, samePost) {
      if (err) return res.json({ success: false, err });
      if (samePost != null) {
        samePost.deleteLike(item.userID);
        console.log('unlike');
      }
    });
    io.emit('unlike-rcv', item);
  });
  socket.on('post-click-snd', (item) => {
    console.log('post clicked');
    var postList = mongoose.model('Post');
    postList.findOneAndUpdate({ postNO: item.postNO }, { $inc: { views: 1 } }, (err) => {
      if (err) return res.json({ success: false, err });
    });
  });
  socket.on('remove-snd', (item) => {
    console.log('remove-snd');
    item.removelist.map((postNO) => {
      var postList = mongoose.model('Post');
      var commentList = mongoose.model('Comment');
      postList.findOneAndDelete({ postNO: postNO }, (err) => {
        console.log('delete post no : ' + postNO);
        if (err) return res.json({ success: false, err });
      });
      commentList.deleteMany({ postNO: postNO }, (err) => {
        console.log('delete comment post no : ' + postNO);
        if (err) return res.json({ success: false, err });
      });
    });
  });
});

httpServer.listen(4080);
