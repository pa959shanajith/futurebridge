const res = require('express/lib/response');
const movies_josn = require('../data/movies.json')

exports.getAllMovies = async (req, res, next) => {
    try {
        let getMoviesfromJSON = movies_josn[req.params.user].moviesList;
        if (getMoviesfromJSON.length === 0) {
            return res.status(500).send({
                status: false,
                error: 'data not found'
            });
        }
        return res.status(200).send({
            status: true,
            data: getMoviesfromJSON,
            message: 'movies found'
        });
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: 'something went wrong , error : ' + error.message
        });
    }
};

exports.bookMovie = async (req, res, next) => {
    try {
        let getMovieObj = movies_josn[req.body.user].moviesList.find((el) => el.id === req.body.movieId);
        if(!getMovieObj || !Object.keys(getMovieObj).length){
            return res.status(500).send({
                status: false,
                error: 'Movie not found'
            });
        }
        return res.status(200).send({
            status: true,
            data: getMovieObj,
            message: 'movies Booked'
        });
    } catch (error) {
        return res.status(500).send({
            status: false,
            error: 'something went wrong , error : ' + error.message
        });
    }
};