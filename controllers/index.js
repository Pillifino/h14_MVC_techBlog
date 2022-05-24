const router = require('express').Router();
const apiRoutes = require('./api');
const blogRoutes = require('./htmlRoute')

router.use('/api', apiRoutes); // middleware for api routes
router.use('/', blogRoutes) // middleware for html routes

module.exports = router;
