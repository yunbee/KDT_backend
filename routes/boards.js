// @ts-check

const express = require('express');

const router = express.Router();

const POST = [
  {
    title: 'title1',
    content: 'content1',
  },
  {
    title: 'title2',
    content: 'content2',
  },
];

router.get('/', (req, res) => {
  if (POST) {
    const postsLen = POST.length;
    res.render('boards', { POST, postCounts: postsLen });
  } else {
    const err = new Error('등록한 포스트가 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/:title', (req, res) => {
  const postData = POST.find((post) => post.title === req.params.title);
  if (postData) {
    res.send(postData);
  } else {
    const err = new Error('해당 포스트가 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.get('/posts/write', (req, res) => {
  res.render('write');
});

// 글 작성
router.post('/', (req, res) => {
  if (req.body.title && req.body.content) {
    const newPost = {
      title: req.body.title,
      content: req.body.content,
    };
    POST.push(newPost);
    res.redirect('/boards');
  } else {
    const err = new Error('모든 값을 입력해 주세요.');
    err.statusCode = 400;
    throw err;
  }
});

router.get('/modify/:title', (req, res) => {
  const postData = POST.find((post) => post.title === req.params.title);
  if (postData) {
    const postIdx = POST.findIndex((post) => post.title === req.params.title);
    const modifyFindPost = POST[postIdx];
    res.render('modify', { modifyFindPost });
  } else {
    const err = new Error('해당 포스트가 존재하지 않습니다.');
    err.statusCode = 404;
    throw err;
  }
});

// 글 수정
router.post('/modify/:title', (req, res) => {
  const postsData = POST.find((post) => post.title === req.params.title);
  if (postsData) {
    const modifyPost = {
      title: req.body.title,
      content: req.body.content,
    };
    const postIdx = POST.findIndex((post) => post.title === req.body.title);
    POST[postIdx] = modifyPost;
    res.redirect('/boards');
  } else {
    const err = new Error('해당 포스트가 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

router.delete('/:title', (req, res) => {
  const postIdx = POST.findIndex((post) => post.title === req.params.title);
  if (postIdx !== -1) {
    POST.splice(postIdx, 1);
    res.sendStatus(204);
  } else {
    const err = new Error('해당 포스트를 찾을 수 없습니다.');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
