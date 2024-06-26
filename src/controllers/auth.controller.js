import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'
import { createAccessToken } from '../libs/jwt.js'
import User from './../models/user.model.js'

export const register = async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body
  try {
    const userFound = await User.findOne({ email })
    if (userFound) {
      console.log('userFound::', userFound)
      return res.status(400).json(['The email already exists'])
    }
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
  console.log(req.body)
  const { email, password } = req.body
  try {
    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res.status(400).json(['User not found'])
    }

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json(['Incorrect password'])
    }

    const token = await createAccessToken({ id: userFound._id })
    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
      httpOnly: false
    })
    res.status(200).json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      message: 'Login successfully'
    })
  } catch (error) {
    console.log('An error ocurred in register', error)
    res.status(500).json({
      message: 'An error ocurred in register',
      error: error.message
    })
  }
}

export const logout = async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })

  return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized'
    })
  }

  jwt.verify(token, TOKEN_SECRET, async(err, user) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }

    const userFound = await User.findById(user.id)
    if (!userFound) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email
    })
  })
}

export const profile = async (req, res) => {
  console.log(req.user)
  const userFound = await User.findById(req.user.id)
  if (!userFound) {
    return res.status(404).json({ message: 'User not found' })
  }
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
  res.send('profile')
}