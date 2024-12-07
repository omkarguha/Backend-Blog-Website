require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

const blogModel = require('./models/blog');

const { checkForAuthenticationCookie } = require('./middlewares/auth');

const app = express();
const PORT =process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL).then(()=> console.log('mongoDB connected'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.get('/', async(req, res)=> {
    const allBlogs = await blogModel.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
})
app.use('/user', userRouter);
app.use('/blog',blogRouter);

app.listen(PORT, ()=> console.log('server started'));