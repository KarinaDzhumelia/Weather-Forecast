<template>
  <div class="main-wrapper" v-if="typeof weather.city !== 'undefined'">
    <div class="weather-wrapper clear-sky">
      <div class="info">
        <div class="location">{{ weather.city.name }} {{ weather.city.country }}</div>
      </div>
      <div class="main">
        <WeatherDay v-for="day in filteredData" :key="day.date._i" :day="day" />
      </div>
    </div>
    <ButtonComponent :pagePath="'/'">Go home</ButtonComponent>
  </div>
</template>

<script>
import moment from 'moment';
import Swal from 'sweetalert2';
import WeatherDay from '@/components/WeatherDay.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

export default {
  name: 'WeekView',
  components: {
    WeatherDay,
    ButtonComponent,
  },
  props: ['lat', 'lon', 'apiKey'],
  data () {
    return {
      url_base: 'https://api.openweathermap.org/data/2.5/forecast?',
      weather: {},
      filteredData: {}
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
      this.filteredData = results.list.map(item => {
        return {
          date: moment(item.dt_txt.split(' ')[0]),
          main: item.main,
          weather: item.weather[0]
        };
      }).reduce((acc, item) => {
        if(!acc.some(day => day.date.isSame(item.date, 'day'))){
          acc.push(item);
        }
        return acc;
      }, []).slice(0,5);
    }
  },
}
</script>

<style scoped lang="scss">
.weather-wrapper {
  padding: 20px;

  .main {
    display: flex;
    justify-content: center;
    background: none;
    flex-wrap: wrap;
    padding: 20px;
  }
}
</style>

