<template>

  <div class="about">
    <input class="form-control" type="text" placeholder="Type a city and press enter..." v-model="weatherData.city" @keyup.enter="handleKeyUp" autocomplete="off"/>
  </div>
  <div v-if="weatherData.error" class="error">{{ weatherData.error }}</div>

  <div v-if="weatherData.details.name" class="date-time">
    <div class="city">{{ weatherData.details.name }}</div>
    <div class="day">{{ weatherData.date_time }}</div>
  </div>
  <div v-if="weatherData.details.name && getCountry[0].name" class="country">{{ weatherData.capital }}, {{ getCountry[0].name }}</div>

  <div v-if="weatherData.details.main">
    <div class="temp-data">
      <div class="temp">{{ weatherData.details.main.temp_max }}</div>
      <div class="unit">&deg;C</div>
      <div><img :src="weatherData.src" class="weather-icon"></div>
    </div>

    <div class="description">{{ weatherData.details.weather[0].description }}</div>
    <div class="weather-data">
      <div>humidity: <span>{{ weatherData.details.main.humidity }}%</span></div>
      <div>clouds: <span>{{ weatherData.details.clouds.all }}%</span></div>
      <div>pressure: <span>{{ weatherData.details.main.pressure }}hPa</span></div>
      <div>wind speed: <span>{{ weatherData.details.wind.speed }}m/s</span></div>
      <div>wind direction: <span>{{ weatherData.details.wind.deg }}&deg;</span></div>
    </div>
    <span @click="handleKeyUp" class="spanBtn">Refresh</span>
    <div :style="{ 'background' : 'url('+getTimeImage+')' }" class="img-day"></div>
  </div>

</template>

<script>
import { reactive } from '@vue/reactivity'
import code from '../assets/countries.json'
import { computed } from '@vue/runtime-core'

export default {
  setup: () => {
    const weatherData   = reactive({
      city: null,
      error: null,
      details: {},
      src: null,
      country_code: null,
      date_time: null,
      capital: null,
      tod: null, // time of day
    })

    const apiURL        = 'http://localhost:3000/'

    const handleKeyUp = async () => {
      await fetch(`${apiURL}?q=${weatherData.city}&units=metric`)
            .then(response => {
              if (!response.ok) throw Error('City not found!')
              return response.json()
            })
            .then(data => {
              weatherData.details       = data
              weatherData.country_code  = data.sys.country
              weatherData.src           = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
              weatherData.error         = null
              getCountryTime()
            })
            .catch(err => weatherData.error = err)
    }

    const getCountry = computed(() => {
      return code.filter((item) => {
        return item.country_code === weatherData.country_code
      })
    })

    const getTimeImage = computed(() => {
      let datetimestr = new Date(weatherData.date_time)
      let hours       = datetimestr.getHours()

      if (hours >= 5 && hours <= 7) weatherData.tod = 'sunrise2.png'
        else if (hours > 7 && hours < 12) weatherData.tod = 'morning.jpg'
        else if (hours >= 12 && hours < 17) weatherData.tod = 'noon.png'
        else if (hours >= 17 && hours < 18) weatherData.tod = 'sunset2.png'
        else if (hours >= 18 && hours < 24) weatherData.tod = 'night.png'
        else weatherData.tod = 'midnight.png'

      return require(`@/assets/images/${weatherData.tod}`)
    })

    const getCountryTime = () => {
      const cc              = code.filter(i => i.country_code === weatherData.country_code)
      weatherData.date_time = new Date().toLocaleString('en-US', { timeZone: `${cc[0].timezones[0]}` })
      weatherData.capital   = cc[0].capital
    }

    return { handleKeyUp, getCountry, getTimeImage, weatherData }
  },
}
</script>

<style scoped>
  .city {
    font-size: 2rem;
    margin-top: 18px;
    font-weight: bold;
  }
  .weather-hdr {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .weather-data {
    display: flex;
    justify-content: space-around;
    font-size: 15px;
    font-family: "Oswald";
    color: darkslategray;
  }
  .weather-data span {
    font-weight: 700;
  }
  img {
    width: 175px;
    margin-bottom: 0;
  }
  .form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #2f3235;
    /* background-color: #aeeef1; */
    background-color: transparent;
    background-clip: padding-box;
    border: 1px solid #268257;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .error {
    padding: 10px;
    border: 1px solid crimson;
    background: #eac2ca;
    color: red;
    margin-top: 15px;
    border-radius: 4px;
  }
  .temp-data {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .temp-data .temp {
    font-size: 6rem;
    color: rgb(47 181 47);
    font-family: "Oswald";
    font-weight: bold;
  }
  .temp-data .unit {
    font-size: 1.5rem;
    font-family: "Oswald";
    font-weight: bold;
    position: relative;
    left: -12%;
  }
  .description {
    margin-right: 24px;
    position: relative;
    text-align: right;
    margin-top: -40px;
    font-weight: bold;
    color: olive;
  }
  .country {
    margin-top: -10px;
  }
  .spanBtn {
    font-size: 10px;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
  }
  .date-time {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .date-time .day {
    font-size: 13px;
    font-family: "Oswald";
    font-weight: 300;
    color: darkolivegreen;
  }
  .img-day {
    background-repeat: no-repeat !important;
    background-size: cover !important;
    min-height: 600px;
    opacity: 50%;
  }

</style>