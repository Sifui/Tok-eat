const dataFunctions = require('../dataFunction/userDataFunction')

const generateRestaurantNameAndDescription = dataFunctions.generateRestaurantNameAndDescription, generatePassword = dataFunctions.generatePassword, 
generateEmail = dataFunctions.generateEmail, generatePhoneNumber = dataFunctions.generatePhoneNumber, generateAddress = dataFunctions.generateAddress

function generateRestaurant() {
    
    nameAndDescription = generateRestaurantNameAndDescription()

    const client = nameAndDescription.map(item => ({
        name : item.name,
        email : generateEmail (item.name),
        phoneNumber: generatePhoneNumber(),
        address: generateAddress(),
        description:item.description,
        image: null,
        password : generatePassword(),
        schedule: null
    }))
    return client
}
module.exports = generateRestaurant()