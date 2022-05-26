const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth')

// router.get('/' ,withAuth, async(req, res) => {
// Create get route that needs the user to be authenticated before loggin in
// })

router.post('/',withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const BlogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!BlogData) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json(BlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  console.log('homepage root route');
  const blogData = await Blog.findAll().catch((err) => {
    console.log('is logged in: ', req.session.loggedin);
    if(err)  res.json(err);
  
  });
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  res.render('blog', { blogs , username:req.session.username, loggedin:req.session.loggedin });
});

module.exports = router;
