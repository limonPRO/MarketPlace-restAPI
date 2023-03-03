const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv').config()
// const JWT_SECRET="mysecret"
exports.registration = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
          email,
          password: hashedPassword
        });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token });
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      }
}

exports.login = async (req,res)=>{
    const { email, password } = req.body;
    try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Authentication user failed.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid Credentials');
    }
    // if (password !== user.password) {
    //   return res.status(401).json({ message: 'Authentication  password failed.' });
    // }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(200).json({ token });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
}