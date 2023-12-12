import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import User from './../models/user.model.js'

export const register = async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({
      username,
      email,
      password: passwordHash
    })
    await newUser.save()
    const userSaved = await newUser.save()
    const token = await createAccessToken({ id: userSaved._id })
    res.cookie('token', token)
    res.status(201).json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      message: 'User registered successfully'
    })
  } catch (error) {
    console.log('An error ocurred in register', error)
    res.status(500).json({
      message: 'An error ocurred in register',
      error: error.message
    })
  }
}

export const login = async (req, res) => {
  res.send('login')
}