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
    const {country_name, fk_region_id} = req.body;

    const newCountry = {
        country_name,
        fk_region_id
    }
    try {
        await pool.query('INSERT INTO countries set ?', [newCountry])
        res.status(200).json({
            message: `You have added a new Country to region ${fk_region_id}`
        })
    }catch(err) {
        res.status(500).json({err})
    }
}


const addOneCity = async (req, res) => {
    const {city_name, fk_country_id} = req.body;

    const newCity = {
        city_name,
        fk_country_id
    }
    try {
        await pool.query('INSERT INTO cities set ?', [newCity])
        res.status(200).json({
            message: `You have added a new city to ${fk_country_id}`
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
            const rows = await pool.query('SELECT * FROM countries WHERE country_id = ?', [id]);
            const currentCountry = rows[0];
            const modifiedCountry = {
                ...currentCountry,
                country_name
            }
            await pool.query('UPDATE countries set ? WHERE country_id = ?', [modifiedCountry, id])
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
            const rows = await pool.query('SELECT * FROM countries WHERE country_id = ?', [id]);
            const currentCountry = rows[0];
            if(currentCountry.active === 1){
                const modifiedCountry = {
                    ...currentCountry,
                    active: 0
                }
                console.log(modifiedCountry);
                await pool.query('UPDATE countries set ? WHERE country_id = ?', [modifiedCountry, id]);
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
            const rows = await pool.query('SELECT * FROM countries WHERE country_id = ?', [id]);
            const currentCountry = rows[0];
            if(currentCountry.active === 0) {
                const modifiedCountry = {
                    ...currentCountry,
                    active: 1
                }
                console.log(modifiedCountry);
                await pool.query('UPDATE countries set ? WHERE country_id = ?', [modifiedCountry, id]);
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
            const rows = await pool.query('SELECT * FROM cities WHERE city_id = ?', [id]);
            const currentCity = rows[0];
            const modifiedCity = {
                ...currentCity,
                city_name
            }
            await pool.query('UPDATE cities set ? WHERE city_id = ?', [modifiedCity, id])
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
            const rows = await pool.query('SELECT * FROM cities WHERE city_id = ?', [id]);
            const currentCity = rows[0];
            if(currentCity.active === 1){
                const modifiedCity = {
                    ...currentCity,
                    active: 0
                }
                await pool.query('UPDATE cities set ? WHERE city_id = ?', [modifiedCity, id]);
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
            const rows = await pool.query('SELECT * FROM cities WHERE city_id = ?', [id]);
            const currentCity = rows[0];
            if(currentCity.active === 0){
                const modifiedCity = {
                    ...currentCity,
                    active: 1
                }
                await pool.query('UPDATE cities set ? WHERE city_id = ?', [modifiedCity, id]);
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

const desactiveRegion = async (req, res) => {
    const {region_id} = req.params;
    const id = region_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const regionList = await pool.query('SELECT * FROM regions');
        console.log(regionList, id);
        if(helper.findRegionById(regionList, id)){
            const rows = await pool.query('SELECT * FROM regions WHERE region_id = ?', [id]);
            const currentRegion = rows[0];
            if(currentRegion.active === 1){
                const modifiedRegion = {
                    ...currentRegion,
                    active: 0
                }
                await pool.query('UPDATE regions set ? WHERE region_id = ?', [modifiedRegion, id]);
                res.status(200).json({
                    message: 'You have desactived a region successfully'
                })
            }else{
                console.log("Ya esta false la columna active");
                res.status(400).json({
                    message: 'This region  is already inactive'
                });
            }
        }else{
            res.status(400).json({
                message: 'The region you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const activeRegion = async (req, res) => {
    const {region_id} = req.params;
    const id = region_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const regionList = await pool.query('SELECT * FROM regions');
        console.log(regionList, id);
        if(helper.findRegionById(regionList, id)){
            const rows = await pool.query('SELECT * FROM regions WHERE region_id = ?', [id]);
            const currentRegion = rows[0];
            if(currentRegion.active === 0){
                const modifiedRegion = {
                    ...currentRegion,
                    active: 1
                }
                await pool.query('UPDATE regions set ? WHERE region_id = ?', [modifiedRegion, id]);
                res.status(200).json({
                    message: 'You have actived a region successfully'
                })
            }else{
                console.log("Ya esta true la columna active");
                res.status(400).json({
                    message: 'This region  is already active'
                });
            }
        }else{
            res.status(400).json({
                message: 'The region you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const getAllRegions = async (req, res) => {
    const regions = await pool.query('SELECT * FROM regions WHERE active = 1');
    console.log(regions);
    res.json(
        regions
    )
}

const getCountriesByRegion = async (req, res) => {
    const {region_id} = req.params;
    const countriesOfRegion = await pool.query('SELECT * FROM countries WHERE fk_region_id = ? AND active = 1', [region_id]);
    res.json(countriesOfRegion)
}

const getCitiesByCountry = async (req, res) => {
    const {country_id} = req.params;
    const citiesOfCountry = await pool.query('SELECT * FROM cities WHERE fk_country_id = ? AND active = 1', [country_id]);
    res.json(citiesOfCountry)
}

const getAllInformation = async (req, res) => {
    console.log("hola entre a allInformation");
    let arrayMaestro = []; //Es el que almacena los objetos maestros
    const allRegions = await pool.query('SELECT * FROM regions WHERE active = 1');//traigo todas las regiones existentes en DB
    console.log("294", allRegions.length);
    for(let i=0; i<allRegions.length; i++ ) { //Por cada region haré una consulta para saner que paises tiene
        let children = [];
        let region= '';
        let id= 0;
        let key = `0-${i}`;
        let objetoMaestro = {
            title: region,
            id: id,
            key,
            children,
        };//Vamos a ir creando un super objeto que contiene todo lo relacionado a una region y los paises que la componen
        objetoMaestro.title = allRegions[i].region_name;
        objetoMaestro.id = allRegions[i].region_id;
        let allInformation = []
        allCountriesOfRegion = await pool.query('SELECT country_name, country_id FROM countries WHERE fk_region_id = ? AND active = 1', [allRegions[i].region_id])//Tengo todos los paises de la region que esta iterando
        let ciudades = [];
        for(let i= 0; i< allCountriesOfRegion.length; i++) {
            const item = allCountriesOfRegion[i];
            // console.log("319", item.country_id);
            let children =[];
            objetoMaestro.children.push({
                id: item.country_id,
                title: item.country_name,
                key: `${key}-${i}`,
                children,
            })
        }
        for(let i= 0; i<allCountriesOfRegion.length; i++){
            // uniqueCities = [];
            const countryItem = allCountriesOfRegion[i];//Tengo uno de los paises de la lista uniques
            const citiesOfCountry = await pool.query('SELECT city_name, city_id FROM cities WHERE fk_country_id = ? AND active = 1', [countryItem.country_id])
            for(let j= 0; j< citiesOfCountry.length; j++){
                objetoMaestro.children[i].children.push({
                    id: citiesOfCountry[j].city_id,
                    title: citiesOfCountry[j].city_name,
                    key: `${key}-${i}-${j}`
                })
            }
        }
        arrayMaestro.push(objetoMaestro);
    }
    res.json({
        arrayMaestro
    });
}

const getOneCountryById = async(req, res) => {
    const {country_id} = req.params;
    const id = country_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const countriesList = await pool.query('SELECT * FROM countries');
        console.log(countriesList, id);
        if(helper.findCountryById(countriesList, id)){
            const rows = await pool.query('SELECT * FROM countries WHERE country_id = ?', [id]);
            const currentCountry = rows[0];
            console.log(currentCountry.country_name);
            res.status(200).json(
                currentCountry
            )
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

const getOneCityById = async(req, res) => {
    const {city_id} = req.params;
    const id = city_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const citiesList = await pool.query('SELECT * FROM cities');
        console.log(citiesList, id);
        if(helper.findCityById(citiesList, id)){
            const rows = await pool.query('SELECT * FROM cities WHERE city_id = ?', [id]);
            const currentCity = rows[0];
            console.log(currentCity.city_name);
            res.status(200).json(
                currentCity
            )
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

const modifyRegion = async (req, res) => {
    const{region_id} = req.params;
    const id = region_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const regionList = await pool.query('SELECT * FROM regions');
        console.log(regionList, id);
        if(helper.findRegionById(regionList, id)){
            console.log('the region you wanna update is in list');
            const{region_name} = req.body;
            const rows = await pool.query('SELECT * FROM regions WHERE region_id = ?', [id]);
            const currentRegion = rows[0];
            const modifiedRegion = {
                ...currentRegion,
                region_name
            }
            await pool.query('UPDATE regions set ? WHERE region_id = ?', [modifiedRegion, id])
            res.status(200).json({
                message: 'You have modified a region successfully'
            })
        }else{
            res.status(400).json({
                message: 'The region you want to modify is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
}

const getOneRegionById = async (req, res) => {
    const {region_id} = req.params;
    const id = region_id;
    const isANumber = /^\d+$/.test(id);//Verificas si realmente lo que te enviaron por param fue un numero
    if(isANumber) {
        const regionsList = await pool.query('SELECT * FROM regions');
        console.log(regionsList, id);
        if(helper.findRegionById(regionsList, id)){
            const rows = await pool.query('SELECT * FROM regions WHERE region_id = ?', [id]);
            const currentRegion = rows[0];
            console.log(currentRegion.region_name);
            res.status(200).json(
                currentRegion
            )
        }else{
            res.status(400).json({
                message: 'The region you want to access is not in List'
            })
        }
    }else{
        res.status(400).json({
            message: 'Send a number as param'
        })
    }
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
    getAllInformation,
    getOneCountryById,
    getOneCityById,
    modifyRegion,
    getOneRegionById,
    desactiveRegion,
    activeRegion
}