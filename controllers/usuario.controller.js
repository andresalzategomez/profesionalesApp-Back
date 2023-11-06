const connectDB = require('../conection')
let database = connectDB();


const saveUsuario = async (req, res) =>{
    try {
        const {username} = req.body.data
        var databaseRef= database.ref();
        var storesRef =databaseRef.child('users');
        
        const respuesta = storesRef.child(username).set(req.body.data);
        respuesta.then((value) => {
            res.status(200).json({
                message: 'Usuario Creado',
                'response': 'OK',
                data: req.body.data
            })
            console.log("respuesta ", value );
          })
          .catch((err) => {
            console.error(err);
          });
        
        
    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message : 'error en la creación'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const getUsuarios = async (req, res) =>{
    try {
        database.ref("users").once('value').then(function(snapshot) {
            usaurios = snapshot.val()
            res.status(200).json({
                'response': 'OK',
                usaurios
            })
        })
        // const result = await sequelize.query('SELECT * FROM ship', {type: sequelize.QueryTypes.SELECT})
        
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

exports.saveUsuario = saveUsuario
exports.getUsuarios = getUsuarios