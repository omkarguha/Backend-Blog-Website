const {Router} = require('express');
const userModel = require('../models/user');
const userRouter = Router();

userRouter.get('/signin', (req, res)=>{
    return res.render('signin');
})

userRouter.get('/signup', (req, res)=>{
    return res.render('signup');
})

userRouter.post('/signup', async(req, res)=>{
    const {fullName, email, password} = req.body;
    await userModel.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
})

userRouter.post('/signin', async(req, res)=>{
    const {email, password} = req.body;
    try {
        const token = await userModel.matchPasswordAndCreateToken(email, password);
        // console.log('User', user);
        return res.cookie('token',token).redirect('/');
    } catch (error) {
        return res.render('signin', {
            error: 'Invalid email or password',
        });
    }
})

userRouter.get('/logout', (req, res)=>{
    res.clearCookie('token').redirect('/');
})

module.exports = userRouter;