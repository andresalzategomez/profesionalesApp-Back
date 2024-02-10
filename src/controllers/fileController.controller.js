const { path } = require("../app")

const uploadFile = async (req, res) =>{
    try {
        res.status(200).json({
            'response': 'OK',
            'url': req.file.filename
        // })
        })

        
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'error en la búsqueda ' + error
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado ' + error
            })
        }
    }
}

exports.uploadFile = uploadFile