exports.generateName = function generateName(){

    const names = `Louanne Havens  
    Mallory Boor  
    Clayton Treece  
    Maximo Blagg  
    Noel Carlile  
    Chris Tardy  
    China Langer  
    Claretta Guy  
    Carla Stefani  
    Georgianne Shropshire  
    Alane Mungia  
    Carisa Hazel  
    Jasmin Melone  
    Yahaira Archibald  
    Gemma Buller  
    Sindy Nuckles  
    Eugene Cauble  
    Brittny Stroope  
    Eboni Driver  
    Alexandra Mero`

    const lines = names.split('\n')
    const firstLast = lines.map(l => l.trim().split(' '))
    return firstLast
}

exports.generatePassword = function generatePassword () {
    return 'azerty'
}

exports.generateEmail = function generateEmail (name) {
    return `${name.replace(/\s/g,'')}@example.com`
}

exports.generatePhoneNumber = function generatePhoneNumber () {
    phoneNumber = '06' + String(parseInt(Math.random()* 100000000))
    return phoneNumber
}

exports.generateAddress = function generateAddress () {
    const address = `Place de l'Eglise
    Place de l'Eglise
    Place de l'Eglise
    Rue Principale
    Rue du Pointey
    Rue de l'Ecole
    Route de Premillieu
    Route de Premillieu
    Rue de Bellevue
    Rue de Bellevue
    Rue de Bellevue
    Rue des Jardins
    Rue du Four
    Rue du Four
    Place de la Fontaine
    Place de l'Eglise
    Place de l'Eglise
    Place de l'Eglise
    Place de l'Eglise`

    const lines = address.split('\n')
    const addresses = Array.from(new Set(lines.map(l => l.trim())))

    final_adress = String(parseInt(Math.random()* 10)) + " " + addresses[parseInt(Math.random()*(addresses.length - 0))]
    
    return final_adress
}

exports.generateRestaurantName = function generateRestaurantName(){

    const names = `Midi Minuit Confluence  
    Les Rupins  
    Modjo  
    L'Atelier des Saveurs  
    Moom Mam  
    To Restaurant  
    Ao Izakaya  
    MAYTHAI Paris  
    Les Rupins
    Anco
    Auberge de Venise Montparnasse  
    Midi Minuit Confluence
    New China
    L'Auberge des Canuts  
    Boccascena
    1860 Le Palais
    Le Roy René  
    Dalloyau  
    Tutiac Bistro Vignerons  
    Restaurant Les Voûtes`

    const lines = names.split('\n')
    const restaurant = lines.map(l => l.trim())
    return restaurant
}

exports.generateDescription = function generateDescription(){

    const names = `HISTORIQUE - Fondée en 1962 dans le quartier du Marché de la Gare, la Brasserie Midi Minuit a traversé le temps… Plus de 4 millions de clients plus tard et une réputation qui n'est plus à faire : bienvenue dans le nouvel espace du resto, entièrement rénové. 
    Bistrot, Entre Amis, Les Mieux Notés, Mesures Covid-19, Noël Et Nouvel An, Nouvel An, Réouvert, Retournons Au Restaurant, Retournons Au Restaurant - 50%, Travelers' Choice 2020, Européen  
    Bistronomique, Réouvert, Retournons Au Restaurant, Retournons Au Restaurant - 50% 
    Anniversaire, Entre Amis, Repas D'affaires, Mesures Covid-19, Réouvert, Retournons Au Restaurant, Retournons Au Restaurant - 50%  
    Anniversaire, Bistronomique, Branché, Cosy, En Famille, Entre Amis, Repas D'affaires, Mesures Covid-19, Réouvert, Asiatique 
    Branché, Cosy, Entre Amis, Repas D'affaires, Romantique, Mesures Covid-19, Réouvert, Européen 
    Bistronomique, Branché, Repas D'affaires, Romantique, Mesures Covid-19, Réouvert, Saint-Valentin, Travelers' Choice 2020, Sushi, Asiatique 
    Brunch, Terrasse, Mesures Covid-19, Réouvert, Travelers' Choice 2020, Asiatique  
    Bistrot, Entre Amis, Les Mieux Notés, Mesures Covid-19, Noël Et Nouvel An, Nouvel An, Réouvert, Retournons Au Restaurant, Retournons Au Restaurant - 50%, Travelers' Choice 2020, Européen
    Bistronomique, Bistrot, Branché, Enfants Bienvenus !, Enterrement De Vie De Garçon, Jeune Fille, Entre Amis, Evénements D'entreprise, Repas D'affaires, Spécial Groupe, Nouvel An, Réouvert, Tous Au Restaurant 2019, INSIDER - Terrasses, Européen
    CÉLÈBRE ITALIEN - Bien installé dans le 14ème arrondissement de Paris, le restaurant italien l’Auberge de Venise, anciennement le Dingo Bar, est un lieu mythique de la ville. Tout comme Fitzgerald, Hemingway ou encore Picasso en leur temps, vous prendrez place dans un cadre charmant au décor vénitien.  
    HISTORIQUE - Fondée en 1962 dans le quartier du Marché de la Gare, la Brasserie Midi Minuit a traversé le temps… Plus de 4 millions de clients plus tard et une réputation qui n'est plus à faire : bienvenue dans le nouvel espace du resto, entièrement rénové.
    Réouvert, Retournons Au Restaurant, Retournons Au Restaurant - 50%, Travelers' Choice 2020, INSIDER - Terrasses, Asiatique
    Mesures Covid-19, Réouvert, Retournons Au Restaurant, Retournons Au Restaurant - 50%, Européen, Français 
    Entre Amis, Spécial Groupe, Terrasse, Réouvert, Retournons Au Restaurant, Retournons Au Restaurant - 50%, Européen
    Cosy, Mesures Covid-19, Réouvert, Retournons Au Restaurant, Retournons Au Restaurant - 50%, Européen
    VUE PANORAMIQUE - Installé aux Terrasses du Port, Le Roy René est devenu incontournable à Marseille. Le restaurant situé au deuxième étage est aussi une agréable brasserie. S'il fait la part belle aux fruits de mer, c'est également le lieu idéal pour une grillade ou une salade repas.  
    CUISINE TRADITIONNELLE – Situé à Marseille, au premier étage et au-dessus de la boutique, le restaurant Dalloyau vous accueille dans un cadre chaleureux pour une petite ou une grande faim. Pâtissier, traiteur, glacier, chocolatier… le restaurant Dalloyau est une invitation au partage de l’art de vivre à la française. 
    Anniversaire, Bar À Vin, Oenothèque, En Famille, Entre Amis, Spécial Groupe, Mesures Covid-19, Réouvert, Retournons Au Restaurant, Retournons Au Restaurant - 50%, Travelers' Choice 2020, INSIDER - Terrasses, Européen  
    LA DÉCORATION – Toutes les personnes qui aiment dîner dans des restaurants avec une décoration originale seront aux anges, des voutes, des tableaux, de quoi vous sortir de vos habitudes.`

    const lines = names.split('\n')
    const restaurant = lines.map(l => l.trim())
    const description = restaurant[parseInt(Math.random()*(restaurant.length - 0))]
    return description
}