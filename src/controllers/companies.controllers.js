const pool = require('../database');
const helper = require('../lib/helpers');

const addOneCompany = async (req, res) => {
    const {name, city_id, address, email, phone} = req.body;
    //Deberia hacer una busqueda para ver si ya existe
    const newCompany = {
        name, 
        city_id,
        address,
        email,
        phone
    }
    try {
        await pool.query('INSERT INTO companies set ?', [newCompany])
        res.status(200).json({
            message: 'You have added a new Company'
        })
    }catch(err) {
        res.status(500).json({err})
    }
}

const modifyOneCompany = async (req, res) => {
    const{company_id} = req.params;
    const id = company_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const companiesList = await pool.query('SELECT * FROM companies');
        console.log(companiesList, id);
        if(helper.findCompanyById(companiesList, id)){
            console.log('the company you wanna update is in list');
            const {name, city_id, address, email, phone} = req.body;
            const rows = await pool.query('SELECT * FROM companies WHERE id = ?', [id]);
            const currentCompany = rows[0];
            const modifiedCompany = {
                ...currentCompany,
                name,
                city_id,
                address,
                email,
                phone
            }
            await pool.query('UPDATE companies set ? WHERE id = ?', [modifiedCompany, id])
            res.status(200).json({
                message: 'You have modified a company successfully'
            })
        }else{
            res.status(400).json({
                message: 'The company you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const desactiveCompany = async (req, res) => {
    const {company_id} = req.params;
    const id = company_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const companiesList = await pool.query('SELECT * FROM companies');
        if(helper.findCompanyById(companiesList, id)){
            const rows = await pool.query('SELECT * FROM companies WHERE id = ?', [id]);
            const currentCompany = rows[0];
            if(currentCompany.active === 1){
                const modifiedCompany = {
                    ...currentCompany,
                    active: 0
                }
                console.log(modifiedCompany);
                await pool.query('UPDATE companies set ? WHERE id = ?', [modifiedCompany, id]);
                res.status(200).json({
                    message: 'You have desactived a company successfully'
                })
            }else{
                console.log("Ya esta false la columna active");
                res.status(400).json({
                    message: 'This company is already inactive'
                });
            }
        }else{
            res.status(400).json({
                message: 'The company you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}


const activeCompany = async (req, res) => {
    const {company_id} = req.params;
    const id = company_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const companiesList = await pool.query('SELECT * FROM companies');
        if(helper.findCompanyById(companiesList, id)){
            const rows = await pool.query('SELECT * FROM companies WHERE id = ?', [id]);
            const currentCompany = rows[0];
            if(currentCompany.active === 0){
                const modifiedCompany = {
                    ...currentCompany,
                    active: 1
                }
                console.log(modifiedCompany);
                await pool.query('UPDATE companies set ? WHERE id = ?', [modifiedCompany, id]);
                res.status(200).json({
                    message: 'You have actived a company successfully'
                })
            }else{
                console.log("Ya esta true la columna active");
                res.status(400).json({
                    message: 'This company is already active'
                });
            }
        }else{
            res.status(400).json({
                message: 'The company you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const getAllCompanies = async (req, res) => {
    const companies = await pool.query('SELECT * FROM companies');
    console.log(companies);
    res.json(
        companies
    )
}

module.exports = {
    addOneCompany,
    modifyOneCompany,
    desactiveCompany,
    activeCompany,
    getAllCompanies
}