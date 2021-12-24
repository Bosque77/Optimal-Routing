// import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express';
import User from '../models/user'


const loginRouter = express.Router();


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
loginRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: 'invalid username or password'
    })
  }

  // const userForToken = {
  //   username: user.username,
  //   id: user._id,
  // }

  const token = {}   // FOREST NEED TO UPDATE THIS LATER 
  // const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })

})

export default loginRouter