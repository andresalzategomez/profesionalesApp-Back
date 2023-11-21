const connectDB = require('../conection')
require('dotenv').config();
const md5 = require('crypto-js/md5')
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

const signIn = async (req, res) =>{
    const {password, username} = req.body
    // let arrayInsertShip = [`${name}`, `${date_creation}`, `${date_destruction}`, `${id_type}`]
    try {
        database.ref("users").once('value').then(function(snapshot) {
            usaurios = snapshot.val()
            console.log("rol", usaurios.role);
            let userExist;
            Object.entries(usaurios).forEach(([key, value]) => {
                if(username == value.username && password == value.password){
                    console.log("value", value);
                    userExist = value
                }
            });
            console.log("userExist", userExist);
            if(userExist != undefined){
                process.env['TOKEN'] = md5(userExist.username+Date.now());
                
                res.status(200).json({
                    'response': 'OK',
                    'description': 'Inicio de sesión exitoso!',
                    'accessToken': process.env['TOKEN'],
                    '_authenticated': true,
                    'authenticatedData': {
                        'nombre': userExist.nombre,
                        'rol': userExist.role,
                        'celular': userExist.celular,
                        'correo': userExist.correo,
                        'username': userExist.username
                    }
                })

                console.log("token", process.env.TOKEN);
            }else{
                res.status(200).json({
                    'response': 'error',
                    'description': 'El usuario no existe',
                    'accessToken': null,
                    '_authenticated': false,
                    'authenticatedData': null
                })
            }
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

const logOut = async (req, res) =>{
    try {
        process.env['TOKEN'] = undefined;
        res.status(200).json({
            'response': 'OK',
            'description': 'Sesión cerrada exitosamente!',
            'accessToken': process.env['TOKEN'],
            '_authenticated': false,
            'authenticatedData': null
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

exports.saveUsuario = saveUsuario
exports.getUsuarios = getUsuarios
exports.signIn = signIn
exports.logOut = logOut