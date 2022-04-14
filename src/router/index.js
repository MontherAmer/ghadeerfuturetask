const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

router.get('/jobs', controllers.listJobs);
router.post('/jobs', controllers.createJob);
router.delete('/jobs/:id', controllers.deleteJob);
router.get('/lookups', controllers.listLookups);

module.exports = router;
