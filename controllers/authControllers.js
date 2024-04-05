const User=require('../models/user')
const jwt=require('jsonwebtoken')

const handleErrors= (err)=> {
    console.log(err.message, err.code)
    let errors = {phone_no:'',email :'', password : ''}

    //incorrect email
    if(err.message==='Incorrect email'){
        errors.email='The email is not registered'
    }
    //incorrect password
    if(err.message==='Incorrect password'){
        errors.password='The password entered is incorrect'
    }

    //duplicates error
    if(err.code === 11000){
        errors.email="That email is already egistered"
        return errors;
    }

    //validate errors
    if(err.message.includes('info validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]=properties.message;
        });
    }
    return errors;
}
const maxAge= 3 * 24 * 60 * 60;
const createToken= (id) =>{
    return jwt.sign({id},'vishal',{
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}
module. exports.login_get = (req, res) => {
    res.render('login');
}
module.exports.signup_post = async (req, res) => {
    const {phone_no, email, password } = req.body;

    try {
        const user = await User.create({phone_no, email, password });
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly: true,maxAge: maxAge*1000});
        res.status(201).json({user : user._id});
    }
    catch (err){
    const errors = handleErrors(err);
    res.status(400).json({errors});
    }

}
module.exports.login_post = async (req, res) => {
    const  { email, password } = req.body;
    try {
        const user=await User.login(email,password)
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly: true,maxAge: maxAge*1000});
        res.status(200).json({user : user._id})
    } catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}
module.exports.logout_get = (req,res) => {
    res.cookie('jwt','',{maxAge : 1});
    res.render('login');
}