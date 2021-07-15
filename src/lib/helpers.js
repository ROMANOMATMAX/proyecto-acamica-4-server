const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const helper = {

}

helper.findCoincidenceProducts = (list, itemId) => {
    let match = false;
    list.forEach(item => {
        if(item.product_id === itemId) {
            match = true;
            return match;
        }
    });
    return match;
}

helper.findCoincidenceUsers = (list, itemId) => {
    let match = false;
    list.forEach(item => {
        if(item.product_id === itemId) {
            match = true;
            return match;
        }
    });
    return match;
}

helper.findCoincidenceOrders = (list, itemId) => {
    let match = false;
    list.forEach(item => {
        if(item.id === itemId) {
            match = true;
            return match;
        }
    });
    return match;
}

helper.findCoincidenceInProductList = (list, id) => {
    const itemId = parseInt(id);
    console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.id === itemId) {
            match = true;
            return match;
        }
    });
    return match;
}

helper.findCoincidenceInOrderList = (list, id) => {
    const itemId = parseInt(id);
    console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.id === itemId) {
            match = true;
            return match;
        }
    });
    return match;
}

helper.findCoincidenceInUserList = (list, id) => {
    const itemId = parseInt(id);
    console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.id === itemId) {
            match = true;
            return match;
        }
    });
    return match;
}

helper.findCoincidenceInUserListBodySRC = (list, id) => {
    const itemId = id;
    console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.id === itemId) {
            match = true;
            return match;
        }
    });
    return match;
}

helper.findCountryById = (list, id) => {
    const itemId = parseInt(id);
    // console.log("hola entre aca");
    // console.log(id);
    // console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.country_id === itemId) {
            match = true;
            return match;
        }
    });
    // console.log(match);
    return match;
}


helper.findCityById = (list, id) => {
    const itemId = parseInt(id);
    console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.city_id === itemId) {
            match = true;
            return match;
        }
    });
    console.log(match);
    return match;
}

helper.findRegionById = (list, id) => {
    const itemId = parseInt(id);
    console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.region_id === itemId) {
            match = true;
            return match;
        }
    });
    console.log(match);
    return match;
}

helper.findCompanyById = (list, id) => {
    const itemId = parseInt(id);
    console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.id === itemId) {
            match = true;
            return match;
        }
    });
    console.log(match);
    return match;
}


helper.findContactById = (list, id) => {
    const itemId = parseInt(id);
    console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.id === itemId) {
            match = true;
            return match;
        }
    });
    console.log(match);
    return match;
}

helper.findChannelById = (list, id) => {
    const itemId = parseInt(id);
    console.log(list);
    let match = false;
    list.forEach(item => {
        if(item.id === itemId) {
            match = true;
            return match;
        }
    });
    console.log(match);
    return match;
}

module.exports = helper;

