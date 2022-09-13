// @ts-check
/* eslint-disable */

const express = require('express');

const router = express.Router();

const USER = [
  {
    id: 'irene',
    name: '김윤비',
    email: 'irene@kakao.com',
  },
  {
    id: 'test',
    name: '테스트',
    email: 'irene@kakao.com',
  },
];

router.get('/', (req, res) => {
  const userLen = USER.length;
  res.render('users', { USER, userCounts: userLen, imgName: 'ireneheart.png' });
  // res.send(USER);
});

router.post('/:name', (req, res) => {
  res.send(`이름이 ${req.params.name}인 유저가 등록 되었습니다.`);
});

router.get('/:id', (req, res) => {
  const userData = USER.find((user) => user.id === req.params.id);
  if (userData) {
    res.send(userData);
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

router.post('/', (req, res) => {
  if (Object.keys(req.query).length >= 1) {
    if (req.query.id && req.query.name && req.query.email) {
      const newUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      // @ts-ignore
      USER.push(newUser);
      res.redirect('/users');
    } else {
      const err = new Error('Unexpected query');
      err.statusCode = 404;
      throw err;
    }
  } else if (req.body) {
    if (req.body.id && req.body.name && req.body.email) {
      const newUser = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      // @ts-ignore
      USER.push(newUser);
      res.redirect('/users');
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

router.put('/:id', (req, res) => {
  if (req.query.id && req.query.name && req.query.email) {
    const userData = USER.find((user) => user.id === req.params.id);
    if (userData) {
      const arrIndex = USER.findIndex((user) => user.id === req.params.id);
      const modifyUser = {
        id: req.query.id,
        name: req.query.name,
        email: req.query.email,
      };
      // @ts-ignore
      USER[arrIndex] = modifyUser;
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

router.delete('/:id', (req, res) => {
  const arrIndex = USER.findIndex((user) => user.id === req.params.id);
  if (arrIndex !== -1) {
    USER.splice(arrIndex, 1);
    res.send('회원 삭제 완료');
  } else {
    const err = new Error('ID not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
