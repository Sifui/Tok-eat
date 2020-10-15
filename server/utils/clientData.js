const dataFunctions = require('./dataFunctions')

const generateName = dataFunctions.generateName, generatePassword = dataFunctions.generatePassword, generateEmail = dataFunctions.generateEmail,
generatePhoneNumber = dataFunctions.generatePhoneNumber, generateAddress = dataFunctions.generateAddress

function generateClient() {
    firstLast = generateName()

    const client = firstLast.map(item => ({
        first_name : item[0],
        last_name : item [1],
        email : generateEmail (item[0]),
        phone_number: generatePhoneNumber(),
        address: generateAddress(),
        image:null,
        isAdmin: false,
        password : generatePassword()
    }))
    return client
}

module.exports = generateClient()