const pool = require('../database');
const helper = require('../lib/helpers');

const addOneContact = async (req, res) => {
    const {fullname, email, company_id, city_id, address, contactChannel} = req.body;
    //Deberia hacer una busqueda para ver si ya existe
    const newContact = {
        fullname,
        email,
        company_id, 
        city_id,
        address,
        contactChannel
    }
    try {
        await pool.query('INSERT INTO contacts set ?', [newContact])
        res.status(200).json({
            message: 'You have added a new Contact'
        })
    }catch(err) {
        res.status(500).json({err})
    }
}

const modifyOneContact = async (req, res) => {
    const{contact_id} = req.params;
    const id = contact_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const contacstList = await pool.query('SELECT * FROM contacts');
        console.log(contactsList, id);
        if(helper.findContactById(contactsList, id)){
            console.log('the contact you wanna update is in list');
            const {fullname, email, company_id, city_id, address, contactChannel} = req.body;
            const rows = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
            const currentContact = rows[0];
            const modifiedContact = {
                ...currentContact,
                fullname,
                email,
                company_id, 
                city_id,
                address,
                contactChannel
            }
            await pool.query('UPDATE contacts set ? WHERE id = ?', [modifiedContact, id])
            res.status(200).json({
                message: 'You have modified a contact successfully'
            })
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

const desactiveContact = async (req, res) => {
    const {contact_id} = req.params;
    const id = contact_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const contactsList = await pool.query('SELECT * FROM contacts');
        if(helper.findContactById(contactsList, id)){
            const rows = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
            const currentContact = rows[0];
            if(currentContact.active === 1){
                const modifiedContact = {
                    ...currentContact,
                    active: 0
                }
                console.log(modifiedContact);
                await pool.query('UPDATE contacts set ? WHERE id = ?', [modifiedContact, id]);
                res.status(200).json({
                    message: 'You have desactived a contact successfully'
                })
            }else{
                console.log("Ya esta false la columna active");
                res.status(400).json({
                    message: 'This contact is already inactive'
                });
            }
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

const activeContact = async (req, res) => {
    const {contact_id} = req.params;
    const id = contact_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const contactsList = await pool.query('SELECT * FROM contacts');
        if(helper.findContactById(contactsList, id)){
            const rows = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
            const currentContact = rows[0];
            if(currentContact.active === 0){
                const modifiedContact = {
                    ...currentContact,
                    active: 1
                }
                console.log(modifiedContact);
                await pool.query('UPDATE contacts set ? WHERE id = ?', [modifiedContact, id]);
                res.status(200).json({
                    message: 'You have actived a contact successfully'
                })
            }else{
                console.log("Ya esta false la columna active");
                res.status(400).json({
                    message: 'This contact is already active'
                });
            }
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
    addOneContact,
    modifyOneContact,
    desactiveContact,
    activeContact
}