const { Admin, Auth } = require('../../middlewares/auth') // Auth es para usuarios autenticados
const {
  register,
  login,
  GetUsr,
  getUserById,
  updateUser,
  deleteUser
} = require('../crontollers/users')

const usersRoutes = require('express').Router()

usersRoutes.get('/', [Admin], GetUsr)

usersRoutes.get('/:id', [Admin], getUserById)

usersRoutes.post('/register', register)

usersRoutes.post('/login', login)

usersRoutes.put('/:id', updateUser)

usersRoutes.delete('/:id', deleteUser)

module.exports = usersRoutes
