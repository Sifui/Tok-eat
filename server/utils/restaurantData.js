const dataFunctions = require('./dataFunctions')

const generateRestaurantName = dataFunctions.generateRestaurantName, generatePassword = dataFunctions.generatePassword, generateEmail = dataFunctions.generateEmail,
generatePhoneNumber = dataFunctions.generatePhoneNumber, generateAddress = dataFunctions.generateAddress, generateDescription = dataFunctions.generateDescription

function generateRestaurant() {
    name = generateRestaurantName()

    const client = name.map(item => ({
        name : item,
        email : generateEmail (item),
        phone_number: generatePhoneNumber(),
        address: generateAddress(),
        description:generateDescription(),
        image: null,
        password : generatePassword(),
        schedule: null
    }))
    return client
}

module.exports = generateRestaurant()