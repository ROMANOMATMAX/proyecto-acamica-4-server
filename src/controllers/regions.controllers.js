const pool = require('../database');
const helper = require('../lib/helpers');

const addOneRegion = async (req, res) => {
    const {region_name} = req.body;
    //Deberia hacer una busqueda para ver si ya existe
    const newRegion = {
        region_name
    }
    try {
        await pool.query('INSERT INTO regions set ?', [newRegion])
        res.status(200).json({
            message: 'You have added a new Region'
        })
    }catch(err) {
        res.status(500).json({err})
    }
}

const addOneCountry = async (req, res) => {
    const {country_name, region_id} = req.body;

    const newCountry = {
        country_name,
        region_id
    }
    try {
        await pool.query('INSERT INTO countries set ?', [newCountry])
        res.status(200).json({
            message: `You have added a new Country to region ${region_id}`
        })
    }catch(err) {
        res.status(500).json({err})
    }
}


const addOneCity = async (req, res) => {
    const {city_name, country_id} = req.body;

    const newCity = {
        city_name,
        country_id
    }
    try {
        await pool.query('INSERT INTO cities set ?', [newCity])
        res.status(200).json({
            message: `You have added a new city to ${country_id}`
        })
    }catch(err) {
        res.status(500).json({err})
    }
}

const modifyCountry = async (req, res) => {
    const{country_id} = req.params;
    const id = country_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const countriesList = await pool.query('SELECT * FROM countries');
        console.log(countriesList, id);
        if(helper.findCountryById(countriesList, id)){
            console.log('the country you wanna update is in list');
            const{country_name} = req.body;
            const rows = await pool.query('SELECT * FROM countries WHERE id = ?', [id]);
            const currentCountry = rows[0];
            const modifiedCountry = {
                ...currentCountry,
                country_name
            }
            await pool.query('UPDATE countries set ? WHERE id = ?', [modifiedCountry, id])
            res.status(200).json({
                message: 'You have modified a country successfully'
            })
        }else{
            res.status(400).json({
                message: 'The country you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const desactiveCountry = async (req, res) => {
    const {country_id} = req.params;
    const id = country_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const countriesList = await pool.query('SELECT * FROM countries');
        console.log(countriesList, id);
        if(helper.findCountryById(countriesList, id)){
            const rows = await pool.query('SELECT * FROM countries WHERE id = ?', [id]);
            const currentCountry = rows[0];
            if(currentCountry.active === 1){
                const modifiedCountry = {
                    ...currentCountry,
                    active: 0
                }
                console.log(modifiedCountry);
                await pool.query('UPDATE countries set ? WHERE id = ?', [modifiedCountry, id]);
                res.status(200).json({
                    message: 'You have desactived a country successfully'
                })
            }else{
                console.log("Ya esta false la columna active");
                res.status(400).json({
                    message: 'This country is already inactive'
                });
            }
        }else{
            res.status(400).json({
                message: 'The country you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const activeCountry = async (req, res) => {
    const {country_id} = req.params;
    const id = country_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const countriesList = await pool.query('SELECT * FROM countries');
        console.log(countriesList, id);
        if(helper.findCountryById(countriesList, id)){
            const rows = await pool.query('SELECT * FROM countries WHERE id = ?', [id]);
            const currentCountry = rows[0];
            if(currentCountry.active === 0) {
                const modifiedCountry = {
                    ...currentCountry,
                    active: 1
                }
                console.log(modifiedCountry);
                await pool.query('UPDATE countries set ? WHERE id = ?', [modifiedCountry, id]);
                res.status(200).json({
                    message: 'You have actived a country successfully'
                })
            }else{
                console.log("Ya esta true la columna active");
                res.status(400).json({
                    message: 'This country is already active'
                });
            }
        }else{
            res.status(400).json({
                message: 'The country you want to active is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const modifyCity = async (req, res) => {
    const{city_id} = req.params;
    const id = city_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const citiesList = await pool.query('SELECT * FROM cities');
        console.log(citiesList, id);
        if(helper.findCityById(citiesList, id)){
            console.log('the city you wanna update is in list');
            const{city_name} = req.body;
            const rows = await pool.query('SELECT * FROM cities WHERE id = ?', [id]);
            const currentCity = rows[0];
            const modifiedCity = {
                ...currentCity,
                city_name
            }
            await pool.query('UPDATE cities set ? WHERE id = ?', [modifiedCity, id])
            res.status(200).json({
                message: 'You have modified a city successfully'
            })
        }else{
            res.status(400).json({
                message: 'The city you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const desactiveCity = async (req, res) => {
    const {city_id} = req.params;
    const id = city_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const citiesList = await pool.query('SELECT * FROM cities');
        console.log(citiesList, id);
        if(helper.findCityById(citiesList, id)){
            const rows = await pool.query('SELECT * FROM cities WHERE id = ?', [id]);
            const currentCity = rows[0];
            if(currentCity.active === 1){
                const modifiedCity = {
                    ...currentCity,
                    active: 0
                }
                await pool.query('UPDATE cities set ? WHERE id = ?', [modifiedCity, id]);
                res.status(200).json({
                    message: 'You have desactived a city successfully'
                })
            }else{
                console.log("Ya esta false la columna active");
                res.status(400).json({
                    message: 'This city is already inactive'
                });
            }
        }else{
            res.status(400).json({
                message: 'The city you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const activeCity = async (req, res) => {
    const {city_id} = req.params;
    const id = city_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const citiesList = await pool.query('SELECT * FROM cities');
        console.log(citiesList, id);
        if(helper.findCityById(citiesList, id)){
            const rows = await pool.query('SELECT * FROM cities WHERE id = ?', [id]);
            const currentCity = rows[0];
            if(currentCity.active === 0){
                const modifiedCity = {
                    ...currentCity,
                    active: 1
                }
                await pool.query('UPDATE cities set ? WHERE id = ?', [modifiedCity, id]);
                res.status(200).json({
                    message: 'You have actived a city successfully'
                })
            }else{
                console.log("Ya esta true la columna active");
                res.status(400).json({
                    message: 'This city is already active'
                });
            }
        }else{
            res.status(400).json({
                message: 'The city you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const getAllRegions = async (req, res) => {
    const regions = await pool.query('SELECT * FROM regions');
    console.log(regions);
    res.json(
        regions
    )
}

const getCountriesByRegion = async (req, res) => {
    const {region_id} = req.params;
    const countriesOfRegion = await pool.query('SELECT * FROM countries WHERE region_id = ?', [region_id]);
    res.json(countriesOfRegion)
}

const getCitiesByCountry = async (req, res) => {
    const {country_id} = req.params;
    const citiesOfCountry = await pool.query('SELECT * FROM cities WHERE country_id = ?', [country_id]);
    res.json(citiesOfCountry)
}

const getAllInformation = async (req, res) => {
    const id = 50;
    let arrayMaestro = []; //Es el que almacena los objetos maestros
    const allRegions = await pool.query('SELECT * FROM regions');//traigo todas las regiones existentes en DB
    for(let i=0; i<allRegions.length; i++ ) { //Por cada region haré una consulta para saner que paises tiene
        let children = [];
        let region= '';
        let key = `0-${i}`;
        let objetoMaestro = {
            title: region,
            key,
            children,
        };//Vamos a ir creando un super objeto que contiene todo lo relacionado a una region y los paises que la componen
        objetoMaestro.title = allRegions[i].region_name;
        let allInformation = []
        //Consultamos por los datos de paises y ciudades asociados a esta region
        allInformation = await pool.query('SELECT r.region_name, c.country_name, ct.city_name FROM cities ct INNER JOIN countries c ON ct.country_id = c.id INNER JOIN regions r ON r.id = c.region_id WHERE r.id = ?;', [allRegions[i].id]);
        let uniqueCountries = [];
        //Vamos a filtrar los paises que pertenecen a esta region-como pueden estar repetidos se hace esto
        allInformation.forEach(item => {
            if(!uniqueCountries.includes(item.country_name)) {
                uniqueCountries.push(item.country_name);
                console.log("No estaba en la lista",uniqueCountries);
            }
        })
        let ciudades = [];
        for(let i= 0; i< uniqueCountries.length; i++) {
            const item = uniqueCountries[i];
            let children =[];
            objetoMaestro.children.push({
                title: item,
                key: `${key}-${i}`,
                children,
            })
        }
        // uniqueCountries.forEach(item => {
        //     let children =[];
        //     objetoMaestro.children.push({
        //         title: item,
        //         key:
        //         item,
        //         children,
        //     })
        // })
        console.log(objetoMaestro);
        let uniqueCities = [];
        for(let i= 0; i<uniqueCountries.length; i++){
            uniqueCities = [];
            const countryItem = uniqueCountries[i];
            allInformation.forEach(item => {
                if(item.country_name === countryItem) {
                    uniqueCities.push(item.city_name);
                }
            })
            console.log(`${i}`,uniqueCities);
            for(let j= 0; j< uniqueCities.length; j++){
                objetoMaestro.children[i].children.push({
                    title: uniqueCities[j],
                    key: `${key}-${i}-${j}`
                })
            }
        }
        console.log(objetoMaestro);
        // console.log(objetoMaestro.paises[0].ciudades);
        //Tengo todos los paises unicos en el array uniqueCountries
        arrayMaestro.push(objetoMaestro);
        console.log(arrayMaestro.length);
    }
    // console.log(arrayToBeSent);
    res.json({
        arrayMaestro
    });
}

module.exports = {
    addOneRegion,
    addOneCountry,
    addOneCity,
    modifyCountry,
    desactiveCountry,
    modifyCity,
    desactiveCity,
    activeCountry,
    activeCity, 
    getAllRegions,
    getCountriesByRegion,
    getCitiesByCountry,
    getAllInformation
}