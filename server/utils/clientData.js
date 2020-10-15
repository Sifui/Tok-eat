function generateName(){

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
    console.log(firstLast)

    return firstLast
}

function generatePassword () {
    return 'azerty'
}

function generateEmail (name) {
    return `${name}@example.com`
}

function generatePhoneNumber () {
    phoneNumber = '06' + String(parseInt(Math.random()* 100000000))
    return phoneNumber
}

function generateAddress () {
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
    const addresses = new Set(lines.map(l => l.trim()))
    console.log(addresses)

    final_adress = String(parseInt(Math.random()* 10))
}

generateAddress()