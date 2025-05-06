//1. library imports
const express = require('express');
const parser = require('body-parser');
const multer = require('multer');

//2. app setting
const app = express();
const encodedParser = parser.urlencoded({extended: true});
const uploadProcessor = multer({dest: "public/upload"});

app.use(express.static('public'))   //serves all static files from public folder
app.use(encodedParser)
app.set("view engine", "ejs")

let posts = [];

//3. routes
//home
app.get('/', (req, res)=>{
    res.render('cyan-and-us.ejs')
})

//eureka!
app.get('/eureka', (req, res)=>{
    // res.render('eureka.ejs', {allPosts: posts})

    //now with filters!
    const tag = req.query.filter;

    let filteredPosts = posts;
    if (tag) {
        filteredPosts = posts.filter(post => post.tag.includes(tag));
    }

    res.render('eureka.ejs', { allPosts: filteredPosts, selectedTag: tag });
})

//advice from collectors
app.get('/jacks-advice', (req, res)=>{
    res.render('jacks-advice.ejs')
})

//become a collector
app.get('/become-a-collector', (req, res)=>{
    res.render('become-a-collector.ejs')
})

//become a collector 2
app.get('/become-a-collector-2', (req, res)=>{
    res.render('become-a-collector-2.ejs')
})

//slideshow
app.get('/slideshow', (req, res)=>{
    res.render('slideshow.ejs')
})

app.post('/upload', uploadProcessor.single("image"), (req, res)=>{
    let now = new Date()

    let tags = req.body.tag;
    //if tags isn't an array (single tag) then wrap it in an array
    if (!Array.isArray(tags)) {
        tags = [tags];
    }

    //local temporary post obj that determines structure of each element in the array
    let post = {
        alias: req.body.alias,
        date: now.toLocaleString(),
        tag: tags,
        description: req.body.description,
        location: req.body.location,
    }

    //check if file exists
    if(req.file){
        //add img location to the post obj
        post.imgURL = "upload/" + req.file.filename
    }

    //opposite of push; adds to front of array
    posts.unshift(post)

    //redirect back to home page
    res.redirect('/eureka')
})

//4. listen
app.listen(7778, ()=>{
    console.log('server is live at http://127.0.0.1:7778')
})