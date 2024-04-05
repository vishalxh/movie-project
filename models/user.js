const mongoose=require('mongoose');
const { required } = require('nodemon/lib/config');
const bcrypt=require('bcrypt')
const { isEmail }=require('validator')


const userSchema=new mongoose.Schema({
    phone_no: {
        type:String,
        required:true,
        unique: true,
        minlength: [10,"please enter a valid mobile number"]
    },
    email: {
        type:String,
        required: [true, "please enter an email"],
        unique : true,
        lowercase : true,
        validate:[isEmail, "please enter a valid email"]
    },
    password: {
        type : String,
        required : [true,"please enter a password"],
        minlength : [6, "min password length is 6 charcater"]
    }

})
//fire a function before doc saved to db
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

userSchema.statics.login = async function(email,password){
    const user = await this.findOne({email})
    if(user){
        const auth=await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email')
}
const User=mongoose.model('info',userSchema);
module.exports=User;