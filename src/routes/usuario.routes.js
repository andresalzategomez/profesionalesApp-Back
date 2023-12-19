const usuarioController = require('../controllers/usuario.controller') // importar el controlador de caracteristica
const express = require('express') //importar los metodos de la librería express para creación de API 
const router = express.Router()
const {checkSession} = require("../middlewares/origin.js")

router.post('/saveUsuario', checkSession, usuarioController.saveUsuario)
router.post('/updateUsuario', checkSession, usuarioController.updateUsuario)
router.get('/getUsuarios',checkSession, usuarioController.getUsuarios)
router.post('/getRole', checkSession, usuarioController.getRole)
router.post('/signIn', usuarioController.signIn)
router.post('/logOut', usuarioController.logOut)

module.exports = router