const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai
const app = new Clarifai.App({
    apiKey: 'f2e10946c1b54b178cd4fc64c286f92c'
  });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => { 
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
};