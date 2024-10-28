// const connectDB = require('../conection')
const sequelize = require('../conection') // importar la clase par la conexión de la base datos
require('dotenv').config();
const md5 = require('crypto-js/md5')
const { createHash } = require('crypto');
let codigoRecuperacion = ""
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "derechosapp@gmail.com",
      pass: "xbah qvfe kofi efll",
    },
  });

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
        let arrayInsertUsuario = [`${nombre}`, `${celular}`, `${documento}`, `${email}`, `${createHash('sha256').update(password).digest('base64')}`, null, `${username}`];
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
    const { id, nombre, correo, celular} = req.body?.data
    // console.log(id + ", ", nombre + ", " + email + ", " + celular+ ", " + rol_id)

    try {
        const result = await sequelize.query(`UPDATE usuario 
        SET nombre = "${nombre}",  
        email = "${correo}",
        celular = "${celular}"
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
        const usuarios = await sequelize.query('SELECT * FROM usuario', {type: sequelize.QueryTypes.SELECT})
        // console.log("usaurios", usaurios);
        let userExist;
        
        usuarios.forEach(element => {
            // console.log("element", element);
            if(username == element.username && createHash('sha256').update(password).digest('base64') == element.password){
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

const forgotPassword = async (req, res) =>{
    try {
        const {email} = req.body
        
        const usuarios = await sequelize.query('SELECT * FROM usuario', {type: sequelize.QueryTypes.SELECT})
        const found = usuarios?.find((element) => element.email = email);
        // console.log("found", found?.email);

         sendMail(found);
         
        // res.status(200).json({usaurios})
        res.status(200).json({
            'response': 'OK',
            "usuarios": usuarios,
            "codigoRecuperacion": codigoRecuperacion
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

async function sendMail(destinatario) {
    codigoRecuperacion = Math.floor(Math.random() * 999999)
    // send mail with defined transport object
   const info = await transporter.sendMail({
      from: '"Derechos APP" <derechosapp@gmail.com>', // sender address
      to: destinatario?.email, // list of receivers
      subject: "Código cambio de contraseña - DerechosApp", // Subject line
      text: "Hello " + destinatario?.nombre + "!", // plain text body
      html: "<b>Hello " + destinatario?.nombre + "</b><br> <b>Para continuar con el proceso de cambio de contraseña por favor ingresa el siguiente código de validación:</b><br><br><br><br><div style='background: blue; width:100%; height: 40px; display: flex; align-items: center; justify-content: center; color:white;'><b class=''>" + codigoRecuperacion + "</b></div>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
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
exports.forgotPassword = forgotPassword
exports.logOut = logOut