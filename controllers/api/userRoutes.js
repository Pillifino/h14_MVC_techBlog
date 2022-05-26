const router = require('express').Router();
const { response } = require('express');
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    // console.log('root of userRoutes.js')
    console.log(req.body,"User Signup") // Shows data entered by user in sign up form
    const userData = await User.create(req.body);
    console.log(userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.loggedIn = true;
      console.log(req.session)
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    console.log("log in endpoint");
    const userData = await User.findOne({ where: { email: req.body.email } });
    // console.log(userData)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
        console.log(response.message);
      return;
    }
    // Verify the posted password with the password store in the databaseshow
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.email = userData.email;
      req.session.loggedIn = true;
      console.log(req.session)
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
