const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/photos', function (req, res) {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.FLICKR_APIKEY}&tags=${req.body.data.contents}&per_page=100&format=json&nojsoncallback=1`)
        .then(response => {
            console.log(req.body.data.contents)
            res.send(response.data.photos.photo)
        })
})

app.post('/uploads', function (req, res) {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=${process.env.FLICKR_APIKEY}&username=${req.body.data.contents}&format=json&nojsoncallback=1`)
    .then(response => {
        const user = response.data.user.nsid
        //console.log(response.data.user.nsid)
        return axios.get(`https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=${process.env.FLICKR_APIKEY}&user_id=${user}&per_page=100&format=json&nojsoncallback=1`)
    })
        .then(response => {
            //console.log(req.body.data.user)
            res.send(response.data.photos.photo)
        })
})
app.post('/favourites', function (req, res) {

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.people.findByUsername&api_key=${process.env.FLICKR_APIKEY}&username=${req.body.data.contents}&format=json&nojsoncallback=1`)
        .then(response => {
            const user = response.data.user.nsid
            //console.log(response.data.user.nsid)
            return axios.get(`https://api.flickr.com/services/rest/?method=flickr.favorites.getList&api_key=${process.env.FLICKR_APIKEY}&user_id=${user}&per_page=100&format=json&nojsoncallback=1`)
        })
    
        .then(response => {
            //console.log(req.body.data.user)
            res.send(response.data.photos.photo)
        })
})


app.listen(process.env.PORT || 3001)