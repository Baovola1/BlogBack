import User from '../models/user.js';
import bcryptjs from "bcryptjs";
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password || username === '' || email ==='' || password === ''){
       next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email, 
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json('Signup successful');
    } catch (error) {
       next(error);
    }  
};

export const signin = async(req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const userValid = await User.findOne({email});
        if(!userValid){
            return next (errorHandler(404, 'User not found'));
        }
        const passwordValid = bcryptjs.compareSync(password, userValid.password)
        if(!passwordValid){
            next(errorHandler(400, 'Your password is not valid'));
        }
        const token = jwt.sign({id:userValid._id},process.env.JWT_SECRET);
        const{password: pass, ...rest} = userValid._doc;

        res.status(200).cookie('access_token',token,{
            httpOnly:true}).json(rest);
    } catch (error) {
        next(error);
    }
}