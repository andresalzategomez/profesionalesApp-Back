const Sequelize = require('sequelize') // metodo para conexión rápida a la base de datos
const path = process.env.DB_URI // cadena de conexión a Base de datos
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

const sequelize = new Sequelize(path, {
    dialect: 'mysql',
    operatorsAliases: 0 ,
    logging: false,
});

// module.exports = connectDB;
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a Base de Datos.');
    }).catch(err => {
        console.error('Error de conexion:', err);
    })

module.exports = sequelize;