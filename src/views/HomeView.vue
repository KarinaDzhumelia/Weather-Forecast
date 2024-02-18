<template>
  <div class="main-wrapper" v-if="typeof weather.main !== 'undefined'">
    <div class="weather-wrapper" :class="weatherClass">
      <div class="main">
        <div class="info">
          <div class="location">{{ weather.name }} {{ weather.sys.country }}</div>
          <div class="date">{{ dateBuilder() }}</div>
        </div>
        <div class="weather-info">
          <div class="now">
            <div class="temp">{{ Math.round(weather.main.temp) }}°C</div>
            <div class="weather">
              <div class="weather-title">{{ weather.weather[0].main }}</div>
              <div class="weather-icon">
                <img :src="getWeatherIconUrl()" alt="Weather Icon" />
              </div>
            </div>
          </div>
          <div class="temp">Min: {{ Math.round(weather.main.temp_min) }}°C</div>
          <div class="temp">Max: {{ Math.round(weather.main.temp_max) }}°C</div>
        </div>
      </div>
    </div>
    <ButtonComponent :pagePath="'/week'">For a week</ButtonComponent>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ButtonComponent from '@/components/ButtonComponent.vue';

export default {
  name: 'HomeView',
  props: ['lat', 'lon', 'apiKey'],
  components: {
    ButtonComponent,
  },
  data () {
    return {
      url_base: 'https://api.openweathermap.org/data/2.5/weather?',
      weather: {}
    }
  },
  watch: {
    lat: function() {
      this.fetchWeather();
    }
  },
  created() {
    if (this.lat !== '' && this.lon !== '') this.fetchWeather();
  },
  methods: {
    async fetchWeather() {
      try {
        const res = await fetch(`${this.url_base}lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.apiKey}`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch weather data. Status: ${res.status}`);
        }

        const results = await res.json();
        this.setWeather(results);
      } catch (error) {
        console.error('Error fetching weather data:', error);

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong',
        });
      }
    },
    setWeather: function(results) {
      this.weather = results;
    },
    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
    getWeatherIconUrl() {
      const iconId = this.weather.weather[0].icon;
      const baseUrl = 'https://openweathermap.org/img/wn/';
      return `${baseUrl}${iconId}@2x.png`;
    },
  },
  computed: {
    weatherClass() {
      const mainWeather = this.weather.weather[0].main.toLowerCase();
      switch (mainWeather) {
        case 'clear':
          if(this.weather.weather[0].icon[2]==='n') return 'night-clear-sky';
          return 'clear-sky';
          case 'clouds':
          if(this.weather.weather[0].icon[2]==='n') return 'night-clouds';
          return 'clouds';
        case 'rain':
          return 'rain';
        case 'thunderstorm':
          return 'thunderstorm';
        case 'snow':
          return 'snow';
        case 'drizzle':
          return 'drizzle';
        case 'mist':
          return 'mist';
        default:
          return 'clear';
      }
    }
  }
}
</script>