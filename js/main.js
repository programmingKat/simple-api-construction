
document.querySelector('button').addEventListener('click', run)

const geoURL = 'https://api.geocod.io/v2/geocode?'
const daylightAPI = 'https://api.sunrise-sunset.org/v2?'


//an async function is a function that returns a promise
async function getLocation() {
    let q = document.querySelector('#simple_q').value.replaceAll(" ", "+")
    //we must return our promise
    //promise is object with a state & persistent id, event loop to track state, callback fn
    const res = await fetch(`${geoURL}q=${q}&api_key=ab91f911b18f91baab6f9baa86ba9697ab19778`)
        .then(result => result.json())
        .then(data => {
            console.log(data)
            return data.results[0].location


        })
        .catch(err => {
            console.log(`error:${err}`)
        }
        )
    return res
}

async function getDaylight(lat, long) {
    //console.log(`inside second function: lat - ${lat} long -${long}`)

    const res = await fetch(`${daylightAPI}lat=${lat}&lng=${long}`)
        .then(result => result.json())
        .then(data => {
            console.log(data)
            console.log(data.sunrise)
            console.log(data.sunset)
            return data
        })
        .catch(err => {
            console.log(`error:${err}`)
        })
    return res    
}

async function run() {
    //will give me location object
    const location = await getLocation()

    const daylight =  await getDaylight(location.lat, location.lng)
    console.log(daylight)

    //span, image, div
    document.querySelector('#location').innerText = `Your location coordinates based on location are latitude: ${location.lat}, location: ${location.lng} `
    document.querySelector('#sunrise').innerText = `The sun rises at ${daylight.sunrise}`
    document.querySelector('#sunset').innerText = `The sun sets at ${daylight.sunset}`
}