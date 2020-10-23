const dataFunctions = require('./dataFunctions')

const generateName = dataFunctions.generateName, generatePassword = dataFunctions.generatePassword, generateEmail = dataFunctions.generateEmail,
generatePhoneNumber = dataFunctions.generatePhoneNumber, generateAddress = dataFunctions.generateAddress

function generateClient() {
    firstLast = generateName()

    const client = firstLast.map(item => ({
        firstName : item[0],
        lastName : item [1],
        email : generateEmail (item[0]),
        phoneNumber: generatePhoneNumber(),
        address: generateAddress(),
        image:null,
        isAdmin: false,
        password : generatePassword()
    }))
    return client
}

module.exports = generateClient()