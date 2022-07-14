const { Router } = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const createAccessToken = require('../utils/generateToken');
const session = require('express-session');

const User = require('../models/User');

const router = Router();


const createLoginCookie = (res, accessToken) => {
  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: false,
    path: '/api',
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000)
  })
}

// /api/auth
router.post(
  '/register',
  [
    check('email', 'Email is incorrect').isEmail().isLength({ max: 255 }),
    check('password', 'Min length password is 6 symbols or length is too long').isLength({ min: 6, max: 255 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data during registration'
        })
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'User has been created' })
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'User was created' })

    } catch (error) {
      res.status(500).json({
        message: "Something go wrong, try it again"
      })
    }
  })

router.get('/access-token', async (req, res) => {
  // const accessToken = req.cookies.token;
  const accessToken = req.session.token;

  if (!accessToken) {
    req.session.destroy();

    return res.status(400).json({ message: "Log in system" });
  }

  const result = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  if (!result) {
    return res.status(400).json({ message: "Token is incorrect or time life is finished" });
  }

  res.json({ token: accessToken })
})

router.post(
  '/login',
  [
    check('email', 'Enter correct email').normalizeEmail().isEmail().isLength({ max: 255 }),
    check('password', 'Enter password').isLength({ max: 255 }).exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data during login to account'
        })
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User are not found' })
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password or email, try it again' })
      }



      const token = createAccessToken(user._id)

      // createLoginCookie(res, token);
      req.session.token = token;
      req.session.userId = user._id;

      res.json({
        token, userId: user.id
      })


    } catch (error) {
      res.status(500).json({
        message: "Something go wrong, try it again"
      })
    }
  })

router.get('/logout', (req, res) => {
  req.session.destroy(err => {

    if (err) {
      return res.send({ error: 'Logout error' })
    }

    res.clearCookie('LOGIN', { path: '/' })
    res.json({ message: "User was logout" })
  });
  // res.cookie('token', '', {
  //   hhtpOnly: true,
  //   secure: false,
  //   path: '/api',
  //   expires: new Date(0)
  // }).send()
})


module.exports = router;
