const pool = require('../database');
const helper = require('../lib/helpers');

const addOneContact = async (req, res) => {
    const {fullname, email, charge, company_id, fk_city_id, address, fk_region_id, fk_country_id} = req.body;
    //Deberia hacer una busqueda para ver si ya existe
    const newContact = {
        fullname,
        email,
        charge,
        company_id, 
        fk_city_id,
        address,
        fk_region_id,
        fk_country_id
    }
    try {
        const contactCreated = await pool.query('INSERT INTO contacts set ?', [newContact])
        console.log(contactCreated.insertId);
        res.status(200).json({
            message: 'You have added a new Contact',
            new_contact_id: contactCreated.insertId
        })
    }catch(err) {
        res.status(500).json({err})
    }
}

const modifyOneContact = async (req, res) => {
    console.log("hello");
    const{contact_id} = req.params;
    const id = contact_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const contactsList = await pool.query('SELECT * FROM contacts');
        console.log(contactsList, id);
        if(helper.findContactById(contactsList, id)){
            console.log('the contact you wanna update is in list');
            const {fullname, email, charge, company_id, fk_city_id, address, fk_region_id, fk_country_id} = req.body;
            const rows = await pool.query('SELECT * FROM contacts WHERE id = ?', [id]);
            const currentContact = rows[0];
            const modifiedContact = {
                ...currentContact,
                fullname,
                email,
                charge,
                company_id, 
                fk_city_id,
                address,
                fk_region_id,
                fk_country_id
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

const getAllContacts = async(req, res) => {//Ojo por que en get all contacts no estariamos mostrando los canales de contactos o al menos no con esta query
    const contacts = await pool.query('SELECT LASTTABLE.id, LASTTABLE.fullname, LASTTABLE.email, LASTTABLE.charge, LASTTABLE.address, LASTTABLE.city_name, LASTTABLE.country_name, LASTTABLE.region_name, LASTTABLE.fk_city_id, LASTTABLE.fk_country_id, LASTTABLE.fk_region_id, LASTTABLE.company_id, LASTTABLE.name, MIN(LASTTABLE.Whatsapp) as whatsapp, MIN(LASTTABLE.Llamada) as llamada, MIN(LASTTABLE.Email2) as emailchannel, MIN(LASTTABLE.LinkedIn) as linkedIn, MIN(LASTTABLE.Facebook) as facebook, MIN(LASTTABLE.Instagram) as instagram FROM (SELECT FIRSTTABLE.id, FIRSTTABLE.fullname, FIRSTTABLE.email, FIRSTTABLE.charge, FIRSTTABLE.address, FIRSTTABLE.city_name, FIRSTTABLE.country_name, FIRSTTABLE.region_name, FIRSTTABLE.fk_city_id, FIRSTTABLE.fk_country_id, FIRSTTABLE.fk_region_id, FIRSTTABLE.company_id, FIRSTTABLE.name, if(contacttochannel.channel_id=1, contacttochannel.channel_value,null) as `Whatsapp`, if(contacttochannel.channel_id=2, contacttochannel.channel_value,null) as `Llamada`, if(contacttochannel.channel_id=3,contacttochannel.channel_value,null) as `Email2`, if(contacttochannel.channel_id=4,contacttochannel.channel_value,null) as `LinkedIn`, if(contacttochannel.channel_id=5,contacttochannel.channel_value,null) as `Facebook`, if(contacttochannel.channel_id=6,contacttochannel.channel_value,null) as `Instagram` FROM (SELECT cts.fullname, cts.id, cts.email, cts.charge, cts.address, cts.fk_city_id, cts.fk_region_id, cts.fk_country_id, cts.company_id, comp.name, ct.city_name, rg.region_name, ctr.country_name FROM contacts cts INNER JOIN companies comp ON cts.company_id = comp.id INNER JOIN cities ct ON cts.fk_city_id = ct.city_id INNER JOIN regions rg ON rg.region_id = cts.fk_region_id INNER JOIN countries ctr ON ctr.country_id = cts.fk_country_id  WHERE cts.active = 1) AS FIRSTTABLE, contacttochannel WHERE FIRSTTABLE.id = contacttochannel.contact_id) AS LASTTABLE group by LASTTABLE.id');
    console.log(contacts);
    res.json(
        contacts
    )
}
const getFilteredContact = async(req, res) => {//Ojo que no estaría filtrando por canales de comunicacion
    console.log("hello wolrd");
    const {city, compania, country, email, charge, fullname, region} = req.query;
    console.log(city, compania, country, email, fullname, region);
    console.log(typeof(region));
    //En el camino debo ir armando el query de acuerdo a si existe o no el valor
    let atLessOneFilterIsUsed = false;
    let contadorDeParametros = 0;
    let consulta = "SELECT * FROM contacts WHERE";
    let valoresParaConsulta = []
    if(fullname){
        atLessOneFilterIsUsed= true;
        const fullnameAlterated = '%' + fullname + '%'
        valoresParaConsulta.push(fullnameAlterated)
        contadorDeParametros++;
        consulta= consulta + ' ' + 'fullname LIKE ?'
    }
    if(email){
        atLessOneFilterIsUsed= true;
        const emailAlterated = '%' + email + '%'
        valoresParaConsulta.push(emailAlterated)
        if(contadorDeParametros>0) {
            consulta= consulta + ' AND email LIKE ?'    
        }else{
            contadorDeParametros++;
            consulta= consulta + ' email LIKE ?'
        }
    }
    if(charge){
        atLessOneFilterIsUsed= true;
        const chargeAlterated = '%' + charge + '%'
        valoresParaConsulta.push(chargeAlterated)
        if(contadorDeParametros>0) {
            consulta= consulta + ' AND charge LIKE ?'    
        }else{
            contadorDeParametros++;
            consulta= consulta + ' charge LIKE ?'
        }
    }
    if(region){
        atLessOneFilterIsUsed= true;
        const regionAlterated = parseInt(region);
        valoresParaConsulta.push(regionAlterated)
        if(contadorDeParametros>0) {
            consulta= consulta + ' AND fk_region_id = ?'    
        }else{
            contadorDeParametros++;
            consulta= consulta + ' fk_region_id = ?'    
        }
    }
    if(country){
        atLessOneFilterIsUsed= true;
        const countryAlterated = parseInt(country);
        valoresParaConsulta.push(countryAlterated)
        if(contadorDeParametros>0) {
            consulta= consulta + ' AND fk_country_id = ?'    
        }else{
            contadorDeParametros++;
            consulta= consulta + ' fk_country_id = ?'    
        }
    }
    if(city){
        atLessOneFilterIsUsed= true;
        const cityAlterated = parseInt(city);
        valoresParaConsulta.push(cityAlterated)
        if(contadorDeParametros>0) {
            consulta= consulta + ' AND fk_city_id = ?'    
        }else{
            contadorDeParametros++;
            consulta= consulta + ' fk_city_id = ?'    
        }
    }
    if(compania){
        atLessOneFilterIsUsed= true;
        const companiaAlterated = parseInt(compania);
        valoresParaConsulta.push(companiaAlterated)
        if(contadorDeParametros>0) {
            consulta= consulta + ' AND company_id = ?'    
        }else{
            contadorDeParametros++;
            consulta= consulta + ' company_id = ?'    
        }
    }
    //OJO ACA DEBO PONER EL CODIGO PARA FILTRAR POR CONTACT CHANNEL
    // if(contactChannel){
    //     atLessOneFilterIsUsed= true;
    //     if(contadorDeParametros>0) {
    //         consulta= consulta + ' AND contactChannel = ?'    
    //     }else{
    //         contadorDeParametros++;
    //         consulta= consulta + ' contactChannel = ?'    
    //     }
    // }
    //Probar primero hacer una query con lo que venga
    if(atLessOneFilterIsUsed){
        // const fullnameAlterated = '%' + fullname + '%'
        // const emailAlterated = '%' + email + '%'
        // const contacts = await pool.query("SELECT * FROM contacts WHERE fullname LIKE ? OR email LIKE ? OR fk_region_id = ?", [fullnameAlterated, emailAlterated, parseInt(region)]);
        // console.log(contacts);
        const consultaSoloActivos = consulta + " " + "AND active = 1;" 
        const contacts = await pool.query(consultaSoloActivos, valoresParaConsulta);
        console.log(contacts);
        const modifiedContacts = []
        for (const contact of contacts) {
            const contacts = await pool.query('SELECT LASTTABLE.id, LASTTABLE.fullname, LASTTABLE.email, LASTTABLE.charge, LASTTABLE.address, LASTTABLE.city_name, LASTTABLE.country_name, LASTTABLE.region_name, LASTTABLE.fk_city_id, LASTTABLE.fk_country_id, LASTTABLE.fk_region_id, LASTTABLE.company_id, LASTTABLE.name, MIN(LASTTABLE.Whatsapp) as whatsapp, MIN(LASTTABLE.Llamada) as llamada, MIN(LASTTABLE.Email2) as emailchannel, MIN(LASTTABLE.LinkedIn) as linkedIn, MIN(LASTTABLE.Facebook) as facebook, MIN(LASTTABLE.Instagram) as instagram FROM (SELECT FIRSTTABLE.id, FIRSTTABLE.fullname, FIRSTTABLE.email, FIRSTTABLE.charge, FIRSTTABLE.address, FIRSTTABLE.city_name, FIRSTTABLE.country_name, FIRSTTABLE.region_name, FIRSTTABLE.fk_city_id, FIRSTTABLE.fk_country_id, FIRSTTABLE.fk_region_id, FIRSTTABLE.company_id, FIRSTTABLE.name, if(contacttochannel.channel_id=1, contacttochannel.channel_value,null) as `Whatsapp`, if(contacttochannel.channel_id=2, contacttochannel.channel_value,null) as `Llamada`, if(contacttochannel.channel_id=3,contacttochannel.channel_value,null) as `Email2`, if(contacttochannel.channel_id=4,contacttochannel.channel_value,null) as `LinkedIn`, if(contacttochannel.channel_id=5,contacttochannel.channel_value,null) as `Facebook`, if(contacttochannel.channel_id=6,contacttochannel.channel_value,null) as `Instagram` FROM (SELECT cts.fullname, cts.id, cts.email, cts.charge, cts.address, cts.fk_city_id, cts.fk_region_id, cts.fk_country_id, cts.company_id, comp.name, ct.city_name, rg.region_name, ctr.country_name FROM contacts cts INNER JOIN companies comp ON cts.company_id = comp.id INNER JOIN cities ct ON cts.fk_city_id = ct.city_id INNER JOIN regions rg ON rg.region_id = cts.fk_region_id INNER JOIN countries ctr ON ctr.country_id = cts.fk_country_id  WHERE cts.active = 1 AND cts.id = ?) AS FIRSTTABLE, contacttochannel WHERE FIRSTTABLE.id = contacttochannel.contact_id) AS LASTTABLE group by LASTTABLE.id', [contact.id]);
            // const contacts = await pool.query('SELECT cts.fullname, cts.id, cts.email, cts.address, cts.fk_city_id, cts.fk_region_id, cts.fk_country_id, cts.company_id, comp.name, ct.city_name, rg.region_name, ctr.country_name FROM contacts cts INNER JOIN companies comp ON cts.company_id = comp.id INNER JOIN cities ct ON cts.fk_city_id = ct.city_id INNER JOIN regions rg ON rg.region_id = cts.fk_region_id INNER JOIN countries ctr ON ctr.country_id = cts.fk_country_id WHERE cts.id = ? AND cts.active = ? ;', [contact.id, contact.active]);
            modifiedContacts.push(contacts[0]);
          }
        res.json({atLessOneFilterIsUsed, modifiedContacts})    
    }else {
        res.json({atLessOneFilterIsUsed})    
        // res.json({
        //     noFilter: true
        // })
    }
}

const addContactChannel = async (req, res) => {
    //Voy a recibir por el body el valor del canal, el id del contacto, el id del canal, tipo de preferencia
    const {channel_value, contact_id, channel_id, preference} = req.body;
    //Debo verificar que un contacto con ese id realmente existe  
    const contactsList = await pool.query('SELECT * FROM contacts');
    if(helper.findContactById(contactsList, contact_id)){
        const channelsList = await pool.query('SELECT * FROM channels')
        if(helper.findChannelById(channelsList, channel_id)) {
            const newChannel = {
                channel_value,
                contact_id,
                channel_id, 
                preference
            }
            console.log(newChannel);
            try {
                await pool.query('INSERT INTO contacttochannel set ?', [newChannel])
                res.status(200).json({
                    message: 'You have added a new contact channel'
                })
            }catch(err) {
                res.status(500).json({err})
            }
        }else{
            res.status(400).json({
                message: 'The channel id you sent to server is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'The contact you want to modify is not in List'
        })
    }
}


const deleteAllContactChannels = async (req, res) => {
    const {contact_id} = req.params;
    const id = contact_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const contactsList = await pool.query('SELECT * FROM contacts');
        if(helper.findContactById(contactsList, id)){
            await pool.query('DELETE FROM contacttochannel WHERE contact_id = ?', [id])
            res.status(200).json({
                message: 'You have deleted all contact channels successfully'
            })
        }else{
            res.status(400).json({
                message: 'This contact is not in List'
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
    activeContact,
    getAllContacts,
    getFilteredContact,
    addContactChannel,
    deleteAllContactChannels
}