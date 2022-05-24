const router = require('express').Router();
// const { Blog } = require('../../models');

router.get('/', async (req, res) => {
    res.render('blog')
  });

  router.get('/login', async (req, res) => {
    res.render('login')
  });
  
  module.exports = router