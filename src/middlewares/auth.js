const User = require('../api/models/users')
const { verifyJwt } = require('../config/jwt')

const Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)

    user.password = null
    req.user = user
    next()
  } catch (error) {
    return res.status(400).json('No puedes')
  }
}

const Admin = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJwt(parsedToken)

    const user = await User.findById(id)

    if (user.papel === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json('Solo para los administradores')
    }
  } catch (error) {
    return res.status(400).json('No puedes')
  }
}
const isOwnerOrAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyJwt(parsedToken); 

    const user = await User.findById(id); 
    if (!user) {
      return res.status(404).json('Usuario no encontrado');
    }

    const userIdToModify = req.params.id; 
  
    if (user._id.toString() === userIdToModify || user.papel === 'admin') {
      req.user = user; 
      next();
    } else {
      return res.status(403).json('No tienes permisos para realizar esta acción');
    }
  } catch (error) {
    return res.status(403).json('Error de autenticación');
  }
};
module.exports = { Auth, Admin, isOwnerOrAdmin }
