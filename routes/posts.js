// @ts-check
/* eslint-disable */

const express = require('express');

const router = express.Router();

const POST = [
  {
    title: 'title1',
    content: 'content1',
  },
  {
    title: 'title1',
    content: 'content1',
  },
];

router.get('/', (req, res) => {
  const postsLen = POST.length;
  res.render('posts', {
    POST,
    postsCounts: postsLen,
    imgName: 'irenefest.png',
  });
  // res.send(USER);
});

router.post('/:name', (req, res) => {
  res.send(`이름이 ${req.params.name}인 유저가 등록 되었습니다.`);
});

router.get('/:title', (req, res) => {
  const postData = POST.find((post) => post.title === req.params.title);
  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.title && req.query.content) {
      const newPost = {
        title: req.query.title,
        content: req.query.content,
      };
      // @ts-ignore
      POST.push(newPost);
      res.redirect('/posts');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.title && req.body.content) {
      const newPost = {
        title: req.body.title,
        content: req.body.content,
      };
      // @ts-ignore
      POST.push(newPost);
      res.redirect('/posts');
    } else {
      const err = new Error('Unexpected form data');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('No data');
    err.statusCode = 404;
    throw err;
  }
});

router.put('/:title', (req, res) => {
  if (req.query.title && req.query.content) {
    const postData = POST.find((post) => post.title === req.params.title);
    if (postData) {
      const arrIndex = POST.findIndex(
        (post) => post.title === req.params.title
      );
      const modifyPost = {
        title: req.query.title,
        content: req.query.content,
      };
      // @ts-ignore
      USER[arrIndex] = modifyPost;
      res.send('회원 수정 완료');
    } else {
      const err = new Error('ID not found');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('Unexpected query');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/:title', (req, res) => {
  const arrIndex = POST.findIndex((post) => post.title === req.params.title);
  if (arrIndex !== -1) {
    POST.splice(arrIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
