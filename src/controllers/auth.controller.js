import User from './../models/user.model.js'

export const register = async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body
  try {
    const newUser = new User({
      username,
      email,
      password
    })
    await newUser.save()
    const userSaved = await newUser.save()
    res.status(201).json(userSaved)
  } catch (error) {
    console.log('An error ocurred in register', error)
  }
}

export const login = async (req, res) => {
  res.send('login')
}