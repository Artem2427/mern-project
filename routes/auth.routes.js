const { Router } = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const createAccessToken = require('../utils/generateToken')

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
    check('email', 'Некорректный email').isEmail().isLength({ max: 255 }),
    check('password', 'Минимальная длина пароля 6 символов или слишком длинный пароль').isLength({ min: 6, max: 255 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при регистрации'
        })
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'Пользователь создан' })

    } catch (error) {
      res.status(500).json({
        message: "Что-то пошло не так, попробуйте снова"
      })
    }
  })

router.get('/access-token', async (req, res) => {
  const accessToken = req.cookies.token;

  if (!accessToken) {
    return res.status(400).json({ message: "Войдите в систему" });
  }

  const result = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  if (!result) {
    return res.status(400).json({ message: "Неверний токен или закончился" });
  }

  res.json({ token: accessToken })
})

router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail().isLength({ max: 255 }),
    check('password', 'Введіте пароль').isLength({ max: 255 }).exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некоректные данные при  входе в систему'
        })
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }



      const token = createAccessToken(user._id)

      createLoginCookie(res, token);

      res.json({
        token, userId: user.id
      })


    } catch (error) {
      res.status(500).json({
        message: "Что-то пошло не так, попробуйте снова"
      })
    }
  })

router.get('/logout', (req, res) => {
  res.cookie('token', '', {
    hhtpOnly: true,
    secure: false,
    path: '/api',
    expires: new Date(0)
  }).send()
})


module.exports = router;
