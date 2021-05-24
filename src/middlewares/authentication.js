const jwt = require('jsonwebtoken');
const pool = require('../database');
require('dotenv').config();

const verifyTokenMiddleware = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token) {
        return res.status(400).json({
            message: 'No token provided'
        })
    }else{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const idDecoded = decoded.id;
        req.app.set('userId', idDecoded);
        const rows = await pool.query('SELECT * FROM users WHERE id = ?', [idDecoded]);
        if(rows.length > 0){
            next();
        }else{
            return res.status(404).json({
                message: 'No user found'
            })
        }
    }
}


const   isAdmin = async (req, res, next) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [req.app.get('userId')]);
    const user = rows[0];
    if(user.role === 'ADMIN') {
        next();
    }else {
        res.status(403).json({
            message: 'Require admin role'
        })
    }
}

module.exports = {
    verifyTokenMiddleware,
    isAdmin
}