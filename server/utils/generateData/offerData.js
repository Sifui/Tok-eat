const dataFunctions = require('../dataFunction/offerDataFunction')

const generateNameAndDescription = dataFunctions.generateNameAndDescription, generatePrice = dataFunctions.generatePrice

exports.generateOffer = function generateOffer(restaurant,numberOffers) {

    NameAndDescription = generateNameAndDescription()

    const allOffers = NameAndDescription.map(item => ({
        name : item.name,
        price : generatePrice(),
        description: item.description,
        image:null,
        idRestaurant:restaurant,
        idPromo:null
    }))

    // Shuffle array
    const shuffled = allOffers.sort(() => 0.5 - Math.random());

    // Get sub-array of first numberOffers elements after shuffled
    const Offers = shuffled.slice(0, numberOffers);

    return Offers
}