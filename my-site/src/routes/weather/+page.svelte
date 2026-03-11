<script lang=ts>

import {Button} from "$lib/components/ui/button/index.js"
import * as Card from "$lib/components/ui/card/index.js"
import { Input } from "$lib/components/ui/input/index.js";
import * as Table from "$lib/components/ui/table/index.js";
// import { MapLibre, DefaultMarker } from 'svelte-maplibre';
import WeatherMap from '$lib/components/WeatherMap.svelte';


type WeatherData = {
    current: {
    temperature_2m: number;              
    weathercode: number;
    windspeed_10m: number;
    };
};

// NEW type — describes the 7-day forecast
type DailyForecast = {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
};

// $state now knows weather's shape
let weather = $state<WeatherData | null>(null);
let city = $state<string>('Chicago');
let loading = $state<boolean>(false);
let errorMsg = $state("");
let forecast = $state<DailyForecast | null > (null);
let mapLon = $state(-87.63); // Chicago longitude
let mapLat = $state(41.88); // Chicago latitude
let searchedCity = $state("Chicago");

// States
// let city = $state('Chicago');
// let weather = $state(null);
// let loading = $state(false);
let error = $state(null);
let weather_json = $state(null);

// City data - keys are names, values are coordinates
const cities = {
    Chicago:    { lat: 41.88, lon: -87.63 },
    Detroit:    { lat: 42.33, lon: -83.05},
    'New York': { lat: 40.71, lon: -74.01 },
    London:     { lat: 51.51, lon: -0.13},
    Tokyo:      { lat: 35.68, lon: 139.69},
    Beijing:    { lat: 39.9, lon: 116.39},
    Sydney:     { lat: -33.87, lon: 151.21},
};

// WEATHER CODE LOOKUP - API returns numbers, we want words
const weatherDescriptions = {
    0: 'Clear sky',     1: 'Mostly clear',
    2: 'Party cloudy',  3: 'Overcast',
    45: 'Foggy',    51: 'Drizzle',  61: 'Rain',
    71: 'Snow',     80: 'Showers',  95: 'Thunderstorm',
};


async function searchCity() {
    // 1. Convert to city coordinates 
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();
    if (!geoData.results) { 
        errorMsg = "City not found"; 
        return; 
    }
    const { latitude, longitude, name } = geoData.results[0];
    errorMsg = "";
    mapLon = longitude;
    mapLat = latitude;
    searchedCity = name;

    // Step 2: fetch 7-day forecast
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&current=temperature_2m&temperature_unit=fahrenheit&timezone=auto`;
    const res = await fetch(weatherUrl);
    const data = await res.json();
    weather = data;
    forecast = data.daily;
}

// FETCH PATTERN !
// async function fetchWeather() {
//     loading = true;
//     error = null;

//     try {
//         const {lat, lon} = cities[city];
//         const url = `https://api.open-meteo.com/v1/forecast` + 
//             `?latitude=${lat}&longitude=${lon}` +
//             `&current=temperature_2m,weathercode,windspeed_10m` +
//             `&temperature_unit=fahrenheit&windspeed_unit=mph`;
//         const response = await fetch(url);
//         weather = await response.json();
//         //weather_json = weather
//     } catch (e) {
//         error = 'Failed to fetch weather data';
//     }
//     loading = false;
// };

function handleEnter(event) {
    if (event.key == 'Enter') {
        console.log('NETERED');
        searchCity;
    }
}
</script>

<h1 class="text-center text-3xl font-bold text-white mb-4">Weather</h1>

<div class="flex gap-3 mb-6">
    <select bind:value={city} class="p-2 border rounded bg-white">
        {#each Object.keys(cities) as c}
            <option>{c}</option>
        {/each}
    </select>
    <Button variant="destructive" onclick={searchCity} >Get Weather</Button>

    <!-- class="bg-teal-600 
    text-white px-4 py-2 rounded hover:bg-teal-700" -->
</div>

{#if loading}   <p class="text-gray-500">Loading...</p>     {/if}
{#if error}     <p class="text-red-600  font-bod">{error}</p>   {/if}
<!-- 
{#if weather}
    <div class="bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 class="text-x1 font-bold mb-2">{city}</h2>
        <p class="text-5xl font-bold text-teal-700 mb-2">
             {weather_json.current.temperature_2m}°F</p>
        <p class="text-lg mb-1">
            {weatherDescriptions[weather.current.weathercode] ?? 'Unknown'}</p>
        <p class="text-gray-500">
            Wind: {weather.current.windspeed_10m} mph</p>
    </div>
{/if} -->

{#if weather}
    <div class="flex gap-2 mb-4">
        <Input type='text' placeholder="Enter a city..." bind:value={city} on:keydown={handleEnter}/>
        <Button onclick={searchCity}>Search</Button>
    </div>
    {#if errorMsg}<p class="text-red-500 mt-2">{errorMsg}</p>{/if}
    <Table.Root class="bg-white pb-5 pt-5">
        <Table.Header>
            <Table.Row>
                <Table.Head class="font-bold">Date</Table.Head>
                <Table.Head class="font-bold">High</Table.Head>
                <Table.Head class="font-bold">Low</Table.Head>
                <Table.Head class="font-bold">Rain %</Table.Head>
                <Table.Head class="font-bold">Wind (max)</Table.Head>
            </Table.Row>
        </Table.Header>
        <Table.Body>
        <!-- data rows go here (next slide) -->
        {#if forecast}
            {#each forecast.time as day, i}
                <Table.Row>
                    <Table.Cell>{day}</Table.Cell>
                    <Table.Cell>{forecast.temperature_2m_max[i]}°F</Table.Cell>
                    <Table.Cell>{forecast.temperature_2m_min[i]}°F</Table.Cell>
                    <Table.Cell>{forecast.precipitation_probability_max[i]}%</Table.Cell>
                    <Table.Cell>{forecast.wind_speed_10m_max[i]} mph</Table.Cell>
                </Table.Row>
            {/each}
        {/if}
        </Table.Body>
    </Table.Root>

<br>

<WeatherMap lon={mapLon} lat={mapLat} cityName={searchedCity} />

    <!-- <Card.Root class="pb-5 pt-5">
        <Card.Header>
            <Card.Title>{city}</Card.Title>
            <Card.Description>Current conditions</Card.Description>
        </Card.Header>
        <Card.Content>
            <p class="text-4xl font-bold">
                {weather.current.temperature_2m}°F
            </p>
            <p class="text-1xl">{weather.current.windspeed_10m} mph Winds</p>
        </Card.Content>
    </Card.Root> -->
{/if}

<div class="flex justify-center mt-6 mt-auto">
<a href="/WIP" class="text-purple-300 hover:underline font-bold">Continue in playground →</a>
</div>