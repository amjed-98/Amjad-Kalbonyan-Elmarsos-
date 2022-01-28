const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const { sendWelcomeEmail, sendDeletionEmail } = require('../emails/account');

const User = require('../models/user');

//  sign up user
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    sendWelcomeEmail(user.email, user.name);

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

// login user
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

// logout user
router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// logoutAll user
router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//  read user
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

//  update user
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'password', 'email', 'age'];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation)
    return res.status(400).send({
      error: 'Invalid Update, can not update a non existing property',
    });

  try {
    updates.forEach((update) => (req.user[update] = req.body[update])); // ? using bracket notation
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//  delete user
router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    sendDeletionEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000_000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
      return cb(new Error('please upload a valid image'));

    cb(undefined, true);
  },
});

// upload an image
router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),

  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => res.status(400).send({ error: error.message })
);

// delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// show image
router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) throw new Error();

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
