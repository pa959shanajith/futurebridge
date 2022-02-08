const express = require("express");
const router = express.Router();

const moviesService = require('../services/moviesservice');
const validator = require('../utils/validator');


router.get('/getallmovies/:user',(req,res,next) => validator.paramsvalidator(req,res,['user'],next),moviesService.getAllMovies )
router.post('/bookmovie',(req,res,next) => validator.paramsvalidator(req,res,['movieId','user'],next),moviesService.bookMovie )




module.exports = router;