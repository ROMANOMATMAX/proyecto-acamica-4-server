const pool = require('../database');
const helper = require('../lib/helpers');


const getAllContactChannels = async(req, res) => {

    console.log("hello");
    const{contact_id} = req.params;
    const id = contact_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const contactsList = await pool.query('SELECT * FROM contacts');
        console.log(contactsList, contact_id);
        if(helper.findContactById(contactsList, contact_id)){
            const allContactChannels = await pool.query('SELECT * FROM contacttochannel WHERE contact_id = ?', [contact_id]);
            res.json(allContactChannels)
        }else{
            res.status(400).json({
                message: 'The contact you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

module.exports = {
    getAllContactChannels
}