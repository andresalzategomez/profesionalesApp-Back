const profesionalController = require('../controllers/profesional.controller.js') // importar el controlador de caracteristica
const express = require('express') //importar los metodos de la librería express para creación de API 
const router = express.Router()
const {checkSession} = require("../middlewares/origin.js")

// Asignar una metodo y una ruta a un controlador, y así consumir el endpoint 
router.post('/createProfesional', checkSession, profesionalController.createProfesional)
router.post('/getProfesional', profesionalController.getProfesional)
router.post('/getOpiniones', profesionalController.getOpiniones)
// router.get('/:shipId', shipController.getShipId)
// router.get('/name/:shipName/:column', shipController.getShipName)
// router.get('/name/:featureId', shipController.getShipNameInner)
// router.put('/:shipId', shipController.updateShipById)
// router.delete('/:shipId', shipController.deleteShipById)


module.exports = router