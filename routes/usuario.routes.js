const usuarioController = require('../controllers/usuario.controller') // importar el controlador de caracteristica
const express = require('express') //importar los metodos de la librería express para creación de API 
const router = express.Router()

router.post('/saveUsuario', usuarioController.saveUsuario)
router.get('/getUsuarios', usuarioController.getUsuarios)
router.post('/signIn', usuarioController.signIn)
router.post('/logOut', usuarioController.logOut)

module.exports = router