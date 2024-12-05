const express = require('express');
const router = express.Router();
const {handleCreateShortId, handleRedirect, handleAnalytics} = require('../Controller/url')

router.post('/', handleCreateShortId);

router.get('/:shortid', handleRedirect)


router.get('/analytics/:shortid', handleAnalytics)


module.exports = router;

