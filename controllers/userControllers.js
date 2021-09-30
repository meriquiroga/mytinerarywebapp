const User = require("../models/User")
const bcryptjs = require ('bcryptjs')
const jwt = require('jsonwebtoken')

const userControllers = {
  
  addUser: async (req, res) => {
    const {name, surname, email, password, img, country, google} = req.body
    let hashedPass = bcryptjs.hashSync(password)
    const userInfo = new User({
      name,
      surname,
      email,
      password: hashedPass,
      img, 
      country,
      google,
    })
    try {
      let userExists = await User.findOne({email: email})
      if (userExists) throw new Error('Sign up e-mail already in use, please try again with a different one.')
      await userInfo.save()
      const token = jwt.sign({...userInfo}, process.env.SECRETORKEY)
      res.json({ success: true, response: {name: userInfo.name, img: userInfo.img, token}, error: null }) 
    } catch(error) {
      res.json({ success: false, response: null, error: error.message })
    } //de acá sale el error de conexión de back y bd.
  },

  logUser: async (req, res) => {
    const {email, password, flagGoogle} = req.body
    try {
      let userExists = await User.findOne({ email: email }) 
      if (!userExists) throw new Error('E-mail and/or password incorrect')
      if (userExists.google && !flagGoogle) throw new Error('You created your account with Google, please log in with Google button.') 
      let passMatch = bcryptjs.compareSync(password, userExists.password)
      if (!passMatch) throw new Error('E-mail and/or password incorrect')
      const token = jwt.sign({ ...userExists}, process.env.SECRETORKEY)
      res.json({ success: true, response: { token, name: userExists.name, img: userExists.img, userId: userExists.userId }}) 
    } catch(error) {
      res.json({ success: false, error: error.message })
    } //de acá sale el error de conexión de back y bd.
  },

  verifyToken: async (req, res) => {
    res.json({ name: req.user.name, img: req.user.img})
  }
};

module.exports = userControllers;