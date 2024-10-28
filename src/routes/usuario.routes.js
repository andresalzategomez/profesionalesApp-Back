const usuarioController = require('../controllers/usuario.controller') // importar el controlador de caracteristica
const express = require('express') //importar los metodos de la librería express para creación de API 
const router = express.Router()
const {checkSession} = require("../middlewares/origin.js")

router.post('/saveUsuario', checkSession, usuarioController.saveUsuario)
router.post('/getCategorias', usuarioController.getCategorias)
router.post('/saveCategorias', checkSession, usuarioController.saveCategorias)
router.post('/createUsuario', usuarioController.createUsuario)
router.post('/updateUsuario', checkSession, usuarioController.updateUsuario)
router.post('/getUsuarios',checkSession, usuarioController.getUsuarios)
router.post('/getUsuariossinRol',checkSession, usuarioController.getUsuariossinRol)
router.post('/getRole', checkSession, usuarioController.getRole)
router.post('/getFaq', usuarioController.getFaqs)
router.post('/signIn', usuarioController.signIn)
router.post('/forgotPassword', usuarioController.forgotPassword)
router.post('/logOut', usuarioController.logOut)

module.exports = router