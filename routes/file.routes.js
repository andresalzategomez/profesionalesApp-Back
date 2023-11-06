const fileController = require('../controllers/fileController.controller.js') // importar el controlador de caracteristica
const express = require('express') //importar los metodos de la librería express para creación de API 
const router = express.Router()

const multer = require('multer');

const storage = multer.diskStorage({
        filename:function(res, file, cb){
            console.log("file", file);
            const ext = file.originalname.split('.').pop();
            const fileName = Date.now();
            cb(null, `${fileName}.${ext}`);
        },
        destination:function(res, file, cb){
            cb(null, `./public`)
        }
    }
)

const upload = multer({storage});

router.post('/upload', upload.single('myFile'), fileController.uploadFile)

module.exports = router