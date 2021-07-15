const pool = require('../database');
const bcrypt = require('bcryptjs');//Requiero el modulo bcryptjs que encryptara la contraseña para que no vaya descubierta a DB
const jwt = require('jsonwebtoken');
const helper = require('../lib/helpers');
require('dotenv').config();



/********Funcion para logear un usuario ya existente*********/
const checkUserProvided = async (req, res) => {
    
    const {email, password} = req.body; //Destructuring a los datos enviados en el body del request
    //Verifico si el email corresponde a un usuario registrado
    try {
        let rows = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        console.log(rows.length);
        if(rows.length > 0) { //Hubo coincidencia por lo que el email corresponde a un usuario registrado
            const userFound = rows[0];
            console.log(userFound);
            //El password de userFound esta cifrado por que asi se guardo en la DB debo mediante bcrypt compararlo con el pass que introdujó el usuario
            const passwordValid = await bcrypt.compare(password, userFound.password);
            //Chequeamos si el password del usuario es el correcto 
            if(passwordValid) {
                if(userFound.active === 1) {
                    //Se logueo con exito por lo tanto debo entregar el token al usuario para que este habilitado a hacer otras consultas
                    const tokenJWT = jwt.sign({id: userFound.id}, process.env.SECRET_KEY, { //En nuestro caso el token se genera apartir del id
                        expiresIn: 60 * 60 * 24
                    })
            
                    //Enviamos el token al cliente
                    res.status(200).json({
                        auth: true,
                        message: `${tokenJWT}`
                    });
                }else {
                    res.status(400).json({
                        auth: false,
                        message: `This user is inactive - maybe you want to recover your account`
                    });
                }
            }else {
                res.status(400).json({
                    message: 'Invalid password'
                });
            }
        }else { //Es un nuevo email y crearemos un nuevo usuario
            res.status(400).json({
                message: 'Invalid email'
            });
        }    
    }catch(err) {
        res.status(500).json({
            message: `${err}`
        })
    }
    
}


/******Funcion para añadir un nuevo user a la DB y otorgarle su token*****/
const addNewUser = async (req, res) => {

    const {fullname, email, password, role} = req.body; //Destructuring a los datos enviados en el body del request

    //Antes de añadir un nuevo usuario verifico que no este ya registrado en la base de datos 

    let rows = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    console.log(rows.length);
    if(rows.length > 0) { //Hubo coincidencia por lo que el email ya esta usado
        const userFound = rows[0];
        console.log(userFound);
        return res.status(400).json({
            message: "This email is already used"
        })
    }else { //Es un nuevo email y crearemos un nuevo usuario
        //Armo el nuevo objeto a colocar en la DB - los nombres deben ser iguales a los nombres de las columnas en mi db
        const newUser = {
            fullname,
            email, 
            password,
            role,
        }

        // newUser.role = "BASIC";//Cualquier persona que se cree un usuario sera costumer y solo el admin admin podra hcaerlo tmb admin
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);//Clave del nuevo usuario encryptada
        console.log(newUser);
        //Introducimos el nuevo objeto en la DB
        let queryResponse;
        try {
            queryResponse =  await pool.query('INSERT INTO users set ?', [newUser]) //Insertamos a la DB, ojo dentro de la variable queryResponse tenemos un parametro insertId que nos da el id que le dio a este nuevo dato
            const tokenJWT = jwt.sign({id: queryResponse.insertId}, process.env.SECRET_KEY, { //En nuestro caso el token se genera apartir del id
                expiresIn: 60 * 60 * 24
            })
    
            //Enviamos el token al cliente
            res.json({
                auth: true,
                tokenJWT
            });
        }catch(err) {
            console.log(err);
            res.status(500).json({err});
        }
    }
}

const modifyRole = async (req, res) => {
    const currentUser = req.app.get('userId');
    if(currentUser === 1) {
        //Only userId = 1 can modify the role of one user
        const {userId, role} = req.body;
        const userList = await pool.query('SELECT id FROM users');
        if(helper.findCoincidenceInUserListBodySRC(userList, userId)){
            console.log("The user sent in body is inside List");
            const rows = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
            const user = rows[0];
            const modifiedUser = {
                ...user,
                role
            }
            console.log(modifiedUser);
            await pool.query('UPDATE users set ? WHERE id = ?', [modifiedUser, userId]);
            res.status(200).json({
                message:"You updated one user"
            })
        }else {
            res.status(400).json({
                message: 'The user you want to change role is not in List'
            })
        }
    }else {
        console.log('No sos el admin admin');
        res.status(400).json({
            message: 'Not have permission to this action'
        })
    }
}

const getOneUser = async (req, res) => {
    const {user_id} = req.params;
    const id = user_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const allUsersList = await pool.query('SELECT id FROM users');
        if(helper.findCoincidenceInUserList(allUsersList, id)){
            console.log("The user sent in body is inside List");
            const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            const user = rows[0];
            res.status(200).json({
                user,
            })
        }else {
            res.status(400).json({
                message: 'The user you want to get is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const getAllUsers = async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    const actives = [];
    const desactives = [];
    users.forEach(user => {
        if(user.active === 1){
            actives.push(user)
        }else{
            desactives.push(user)
        }
    });
    const activesModified = actives.map( active => {
        const usuarioModificado = {
            key: active.id.toString(),
            id: active.id,
            fullname: active.fullname,
            email: active.email,
            role: active.role,
            active: active.active
        }
        return usuarioModificado
    })
    console.log(activesModified);
    res.json({
        activesModified
    })
}

const modifyOneUser = async (req, res) => {
    const {user_id} = req.params;
    const id = user_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const allUsersList = await pool.query('SELECT id FROM users');
        if(helper.findCoincidenceInUserList(allUsersList, id)){
            console.log("The user sent in body is inside List");
            const {fullname, email, password, role} = req.body;
            const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            const user = rows[0];
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, salt);//Clave del nuevo usuario encryptada
            const modifiedUser = {
                ...user,
                fullname,
                email,
                password: encryptedPassword,
                role
            }
            await pool.query('UPDATE users set ? WHERE id = ?', [modifiedUser, id]);
            res.status(200).json({
                message: 'You have modified a user successfully'
            })
        }else {
            res.status(400).json({
                message: 'The user you want to get is not in List'
            })
        } 
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const desactiveOneUser = async (req, res) => {
    const {user_id} = req.params;
    const id = user_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const allUsersList = await pool.query('SELECT id FROM users');
        if(helper.findCoincidenceInUserList(allUsersList, id)){
            console.log("The user sent in body is inside List");
            const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            const user = rows[0];
            if(user.active === 1){
                const active = 0;
                const modifiedUser = {
                    ...user,
                    active
                }
                await pool.query('UPDATE users set ? WHERE id = ?', [modifiedUser, id]);
                res.status(200).json({
                    message: 'You desactive a user'
                });
            }else{
                console.log("Ya esta false la columna active");
                res.status(400).json({
                    message: 'This user is already inactive'
                });
            }
        }else{
            res.status(400).json({
                message: 'The user you want to delete is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const activeOneUser = async (req, res) => {
    const {user_id} = req.params;
    const id = user_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const allUsersList = await pool.query('SELECT id FROM users');
        if(helper.findCoincidenceInUserList(allUsersList, id)){
            console.log("The user sent in body is inside List");
            const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
            const user = rows[0];
            if(user.active === 0){
                const active = 1;
                const modifiedUser = {
                    ...user,
                    active
                }
                await pool.query('UPDATE users set ? WHERE id = ?', [modifiedUser, id]);
                res.status(200).json({
                    message: 'You active a user'
                });
            }else{
                console.log("Ya esta true la columna active");
                res.status(400).json({
                    message: 'This user is already active'
                });
            }
        }else{
            res.status(400).json({
                message: 'The user you want to delete is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const authenticateUser = async (req, res) => {
    console.log(req.app.get('userId'));
    try {
        const usuario = await pool.query('SELECT id, fullname, email, role, active FROM users WHERE id = ?', [req.app.get('userId')])
        const oneUser = usuario[0];
        console.log(oneUser);
        res.json(oneUser)
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "hubo un error"})
    }
}

module.exports = {
    checkUserProvided,
    addNewUser,
    modifyRole,
    getOneUser, 
    getAllUsers,
    modifyOneUser, 
    desactiveOneUser,
    activeOneUser,
    authenticateUser
}