// const connectDB = require('../conection')
const sequelize = require('../conection') // importar la clase par la conexión de la base datos
require('dotenv').config();
const md5 = require('crypto-js/md5')
// let database = connectDB();


const saveUsuario = async (req, res) =>{
    try {
        const {username} = req.body.data
        var databaseRef= database.ref();
        var storesRef =databaseRef.child('users');
        
        const respuesta = storesRef.child(username).set(req.body.data);
        respuesta.then((value) => {
            res.status(200).json({
                message: 'Usuario guardado con éxito!',
                'response': 'OK',
                data: req.body.data
            })
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


const createUsuario = async (req, res) =>{
    const {nombre, documento, password, email, celular, username} = req.body?.data
    // console.log(password + ", ", nombre + ", " + email + ", " + celular)

    try {
        let arrayInsertUsuario = [`${nombre}`, `${celular}`, `${documento}`, `${email}`, `${password}`, null, `${username}`];
        // console.log("result", arrayInsertUsuario);
        // let arrayInsertProf = [`${nombre}`, `${descripcion}`, `${documento}`, `${celular}`, `${email}`, `${categoria_id}`, `${precio}`, `${imagen}`]
        const result = await sequelize.query('INSERT INTO usuario (nombre, celular, documento, email, password, rol_id, username) VALUES( ?, ?, ?, ?, ?, ?, ?)',
        {replacements: arrayInsertUsuario , type: sequelize.QueryTypes.INSERT })
        
        res.status(200).json({
            message: 'Usuario Creado con éxito!',
            'response': 'OK',
            data: result
        })
        
    } catch (error) {
        console.log("error ", error );

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

const updateUsuario = async (req, res) =>{
    const { id, nombre, email, celular, rol_id} = req.body?.data
    // console.log(id + ", ", nombre + ", " + email + ", " + celular+ ", " + rol_id)

    try {
        const result = await sequelize.query(`UPDATE usuario 
        SET nombre = "${nombre}",  
        email = "${email}",
        celular = "${celular}",
        rol_id = "${rol_id}"
        WHERE id = ${id}`,
        { type: sequelize.QueryTypes.INSERT })
        res.status(200).json({
            message: 'Usuario Actualizado con Éxito!',
            'response': 'OK',
            result,
    })

    } catch (error) {
        if (error.name) {
            res.status(400).json({
                error,
                message: 'error en la actualización'
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
        const usaurios = await sequelize.query('SELECT * FROM usuario', {type: sequelize.QueryTypes.SELECT})
        // res.status(200).json({usaurios})
        res.status(200).json({
            'response': 'OK',
            usaurios
        })
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'error en la búsqueda'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const getUsuariossinRol = async (req, res) =>{
    try {
        const usuarios = await sequelize.query('SELECT * FROM usuario', {type: sequelize.QueryTypes.SELECT})
        let usuariosinRol = [];
        usuarios.forEach(element => {
            if(element.rol_id == null) usuariosinRol.push(element)
        });

        res.status(200).json({
            'response': 'OK',
            usuariosinRol
        })
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'error en la búsqueda'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const getRole = async (req, res) =>{
    try {
        const rol = await sequelize.query('SELECT * FROM rol', {type: sequelize.QueryTypes.SELECT})
        // res.status(200).json({usaurios})
        res.status(200).json({
            'response': 'OK',
            rol
        })
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'error en la búsqueda'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const getCategorias = async (req, res) =>{
    try {
        const categoria = await sequelize.query('SELECT * FROM categoria', {type: sequelize.QueryTypes.SELECT})
        // res.status(200).json({usaurios})
        res.status(200).json({
            'response': 'OK',
            categoria
        })
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'error en la búsqueda'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const saveCategorias = async (req, res) =>{
    const {nombre, descripcion} = req.body
    try {
        let arrayInsertCategoria = [`${nombre}`, `${descripcion}`];
        const result = await sequelize.query('INSERT INTO categoria (nombre, descripcion) VALUES( ?, ?)',
        {replacements: arrayInsertCategoria , type: sequelize.QueryTypes.INSERT })
        
        res.status(200).json({
            message: 'Categoría creada con éxito!',
            'response': 'OK',
            data: result
        })
        
    } catch (error) {
        console.log("error ", error );

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

const getFaqs = async (req, res) =>{
    try {
        const faq = await sequelize.query('SELECT * FROM faq', {type: sequelize.QueryTypes.SELECT})
        // res.status(200).json({usaurios})
        res.status(200).json({
            'response': 'OK',
            faq
        })
    } catch (error) {
        if (error.name) {
            res.status(404).json({
                error,
                message: 'error en la búsqueda'
            })
        } else {
            res.status(500).json({
                error,
                message : 'Error inesperado'
            })
        }
    }
}

const signIn = async (req, res) =>{
    const {password, username} = req.body
    // let arrayInsertShip = [`${name}`, `${date_creation}`, `${date_destruction}`, `${id_type}`]
    try {
        // database.ref("users").once('value').then(function(snapshot) {
        //     usaurios = snapshot.val()
        //     console.log("rol", usaurios.role);
        //     let userExist;
        //     Object.entries(usaurios).forEach(([key, value]) => {
        //         if(username == value.username && password == value.password){
        //             console.log("value", value);
        //             userExist = value
        //         }
        //     });
        //     console.log("userExist", userExist);
        //     if(userExist != undefined){
        //         process.env['TOKEN'] = md5(userExist.username+Date.now());
                
        //         res.status(200).json({
        //             'response': 'OK',
        //             'description': 'Inicio de sesión exitoso!',
        //             'accessToken': process.env['TOKEN'],
        //             '_authenticated': true,
        //             'authenticatedData': {
        //                 'nombre': userExist.nombre,
        //                 'rol': userExist.role,
        //                 'celular': userExist.celular,
        //                 'correo': userExist.correo,
        //                 'username': userExist.username
        //             }
        //         })

        //         console.log("token", process.env.TOKEN);
        //     }else{
        //         res.status(200).json({
        //             'response': 'error',
        //             'description': 'El usuario no existe',
        //             'accessToken': null,
        //             '_authenticated': false,
        //             'authenticatedData': null
        //         })
        //     }
        // })
        const usuarios = await sequelize.query('SELECT * FROM usuario', {type: sequelize.QueryTypes.SELECT})
        // console.log("usaurios", usaurios);
        let userExist;
        
        usuarios.forEach(element => {
            // console.log("element", element);
            if(username == element.username && password == element.password){
                // console.log("value", element);
                userExist = element
            }
        });
        // console.log("userExist", userExist);
        if(userExist != undefined){
            process.env.TOKEN = md5(userExist.username+Date.now());
            
            res.status(200).json({
                'response': 'OK',
                'description': 'Inicio de sesión exitoso!',
                'accessToken': process.env.TOKEN,
                '_authenticated': true,
                'authenticatedData': {
                    'id': userExist.id,
                    'nombre': userExist.nombre,
                    'documento': userExist.documento,
                    'rol': userExist.rol_id,
                    'celular': userExist.celular,
                    'correo': userExist.email,
                    'username': userExist.username
                }
            })

            // console.log("token", process.env.TOKEN);
        }else{
            res.status(200).json({
                'response': 'error',
                'description': 'El usuario no existe',
                'accessToken': null,
                '_authenticated': false,
                'authenticatedData': null
            })
        }
        
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
        process.env.TOKEN = undefined;
        res.status(200).json({
            'response': 'OK',
            'description': 'Sesión cerrada exitosamente!',
            'accessToken': process.env.TOKEN,
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
exports.createUsuario = createUsuario
exports.updateUsuario = updateUsuario
exports.getUsuarios = getUsuarios
exports.getUsuariossinRol = getUsuariossinRol
exports.getRole = getRole
exports.getFaqs = getFaqs
exports.getCategorias = getCategorias
exports.saveCategorias = saveCategorias
exports.signIn = signIn
exports.logOut = logOut