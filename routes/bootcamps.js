// creating routes

const express = require('express');
const router = express.Router(); 

const { protect, authorize } = require('../middleware/auth');

const Bootcamp = require('../models/Bootcamp');



const advancedResults = require('../middleware/advancedResults');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  getBootcampBySlug,
  bootcampPhotoUpload,
  getPublisherBootcamp
} = require('../controllers/bootcamps');




// Include other resources routers
const courseRouter = require('./courses');
const reviewRouter = require('./reviews');


// Re-route in to  other resource routers

router.use('/:bootcampId/courses',courseRouter);
router.use('/:bootcampId/reviews',reviewRouter);


router.route('/')
.get(advancedResults(Bootcamp,'courses'),getBootcamps)
.post(protect,createBootcamp);

router.route('/:id')
.get(getBootcamp)
.put(protect, authorize('publisher','admin'),updateBootcamp)
.delete(protect, authorize('publisher','admin') ,deleteBootcamp);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/bootcamp/:slug').get(getBootcampBySlug);

router.route('/publisher/bootcamp').get(protect, authorize('publisher'), getPublisherBootcamp);

router.route('/:id/photo')
.put(protect,authorize('publisher','admin'),bootcampPhotoUpload);


module.exports=router;