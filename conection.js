// const Sequelize = require('sequelize') // metodo para conexión rápida a la base de datos
// const path = 'mysql://root:root@localhost:3306/spaceship' // cadena de conexión a Base de datos
var firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyCXORnHRdtp4As7T4_SKBhe_rjCE9kSw4s",
     authDomain: "prueba-393fe.firebaseapp.com",
     databaseURL: "https://prueba-393fe-default-rtdb.firebaseio.com/",
     projectId: "prueba-393fe",
     storageBucket: "prueba-393fe.appspot.com",
     messagingSenderId: "664207183696",
     appId: "1:664207183696:web:cde392b48e8804271fe655",
     measurementId: "G-GK5YZ09C7X"
 }

firebase.initializeApp(firebaseConfig)

var connectDB = function(){
    return firebase.database()
} 

module.exports = connectDB;