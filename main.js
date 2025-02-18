// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).

// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.

// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"

async function fetchJson(url) {
    const response = await fetch(url)
    const obj = await response.json()
    return obj;
}

async function getDashboardData(query) {

    try {
        console.log(`Caricando la dashboard per la query ${query}`);
        const destinationsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`)
        console.log(destinationsPromise);
        const weathersPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`)
        console.log(weathersPromise);
        const airportsPromise = fetchJson(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`)
        console.log(airportsPromise);
        const promises = [destinationsPromise, weathersPromise, airportsPromise]
        const [destinations, weathers, airports] = await Promise.all(promises)
        const destination = destinations.find(dest => dest.name.toLowerCase().includes(query.toLowerCase()));
        const weather = weathers.find(w => w.city.toLowerCase().includes(query.toLowerCase()));
        const airport = airports.find(a => a.city.toLowerCase().includes(query.toLowerCase()));

        return {
            city: destination.name,
            country: destination.country,
            temperature: weather.temperature,
            weathers: weather.weather_description,
            airports: airport.name
        }
    } catch (error) {
        throw new error(`Errore nel recupero dei dati: ${error.message}`)
    }

}



getDashboardData('tokyo')
    .then(data => {
        console.log(`The city ${data.city} is in the country ${data.country}, the temperature is ${data.temperature}°C, the weather is ${data.weathers}, and the main airport is ${data.airports}.`);
    })
    .catch(err => {
        console.error('Error:', err.message);
    });


