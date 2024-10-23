const User = require('../models/users')
const { generateSign } = require('../../config/jwt')
const bcrypt = require('bcrypt')

const buscarUsuario = async (NickName) => {
  try {
    const user = await User.findOne({ NickName })
    console.log('Usuario encontrado en la base de datos:', user)
    return user
  } catch (error) {
    console.log('Error al buscar el usuario:', error)
    throw new Error('Error al buscar el usuario')
  }
}

const GetUsr = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const register = async (req, res, next) => {
  try {
    const papel = req.body.papel ? req.body.papel : 'user'

    // Validación del papel
    if (papel !== 'user' && papel !== 'admin') {
      return res.status(400).json('El papel debe ser "user" o "admin".')
    }

    const newUser = new User({
      NickName: req.body.NickName,
      password: req.body.password, // Sin hashear aquí, el modelo lo hará
      papel
    })

    const usuarioDuplicado = await buscarUsuario(req.body.NickName)
    if (usuarioDuplicado) {
      return res.status(400).json('Este nombre ya está cogido')
    }

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    console.log('Datos recibidos:', req.body) // Aquí mostramos los datos recibidos en el login

    const user = await buscarUsuario(req.body.NickName)
    if (!user) {
      console.log('Usuario no encontrado:', req.body.NickName)
      return res
        .status(400)
        .json({ message: 'El usuario no existe', error: [] })
    }

    const passwordMatch = bcrypt.compareSync(req.body.password, user.password)
    if (passwordMatch) {
      const token = generateSign(user._id)
      console.log('Login exitoso, token generado:', token)
      return res.status(200).json({ user, token })
    } else {
      console.log('Contraseña incorrecta para el usuario:', req.body.NickName)
      return res.status(400).json({ message: 'Contraseña incorrecta' })
    }
  } catch (error) {
    console.log('Error durante el login:', error)
    return res.status(400).json({ message: 'Error durante el login', error })
  }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json('Usuario no encontrado')
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true
    })

    if (!updatedUser) {
      return res.status(404).json('Usuario no encontrado')
    }

    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id

    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json('Usuario no encontrado')
    }

    return res.status(200).json('Usuario eliminado correctamente')
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  GetUsr,
  register,
  login,
  getUserById,
  updateUser,
  deleteUser
}
