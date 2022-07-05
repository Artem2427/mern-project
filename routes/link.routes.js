const { Router } = require('express');
const Link = require('../models/Link');
const shortid = require('shortid');
const auth = require('../middleware/auth.middleware');
const config = require('config');

const router = Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl');

    const { from } = req.body;

    const code = shortid.generate();

    const existing = await Link.findOne({ from });

    if (existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code;

    console.log(to);

    const link = new Link({ code, to, from, owner: req.user.userId });

    await link.save();

    res.status(201).json({ link })


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова"
    })
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })

    res.json(links);

  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова"
    })
  }
});

router.get('/:id', auth, async (req, res) => {
  try {

    const link = await Link.findById(req.params.id);

    res.json(link);

  } catch (error) {
    res.status(500).json({
      message: "Что-то пошло не так, попробуйте снова"
    })
  }
})


module.exports = router;