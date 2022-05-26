const router = require('express').Router();
const Blog = require('../models/Blog');
// const { Blog } = require('../../models');

// route to get all blogs
router.get('/', async (req, res) => {
  console.log('homepage root route');
  const blogData = await Blog.findAll().catch((err) => {

    if(err)  res.json(err);
   
  });
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  console.log('is logged in: ', req.session.loggedIn,blogs);

  res.render('blog') 
  // { blogs, username:req.session.username, loggedin:req.session.loggedIn });
});

router.get('/login', async (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
