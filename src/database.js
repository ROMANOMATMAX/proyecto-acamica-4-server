const mysql = require('mysql');

const {promisify} = require('util');//Nos permitira trabajar con async await

const {database} = require('./keys');//Requerimos la config de la DB

const pool = mysql.createPool(database);//Creamos una conexion con la base de datos

pool.getConnection((err, connection) => {//Abrimos conexion antes de exportar para que no tengamos que repetir esto en otros files
    if(err) {//contemplo posibles errores 
        console.log(err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
            console.log("DATABASE CONNECTION WAS CLOSED"); 
        } 
        if(err.code === 'ER_CON_COUNT_ERROR') { 
            console.log("DATABASE HAS TO MANY CONNECTIONS"); 
        } 
        if(err.code === 'ECONNREFUSED') { 
            console.log("DATABASE CONNECTION WAS REFUSED"); 
        } 
    } 
    if(connection) {    
        connection.release(); //CON ESTO REALMENTE EMPIEZA LA CONNECCION 
        console.log("DB is Connected"); 
        return; 
    } 
}) 

pool.query = promisify(pool.query);// Esto es para poder manejar facilmente las queries con async/await y no tener que manejar promesas

module.exports = pool;