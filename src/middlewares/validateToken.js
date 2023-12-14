import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"

export const authRequired = (req, res, next) => {
  console.log('validateToken middleware')
  console.log(req.headers)
  const { token } = req.cookies
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden, invalid token' })
    }
    console.log('user', user)
    req.user = user // the save user in req.user to use in all endpoints
    next() 
  })
  
}