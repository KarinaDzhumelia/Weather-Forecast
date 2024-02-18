<template>
    <div class="weather-day">
        <div class="date">{{ dateBuilder(day.date._i) }}</div>
        <div class="weather-info">
            <div class="temp">Min: {{ Math.round(day.main.temp_min) }}°C</div>
            <div class="temp">Max: {{ Math.round(day.main.temp_max) }}°C</div>
              <div class="weather-title">{{ day.weather.main }}</div>
              <img :src="getWeatherIconUrl(day.weather.icon)" alt="Weather Icon" />   
          </div>
    </div>
</template>
  
<script>
export default {
  props: ['day'],
  methods: {
    dateBuilder: function(dateValue) {
      let d = new Date(dateValue);
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    },
    getWeatherIconUrl: function(iconId) {
      const baseUrl = 'https://openweathermap.org/img/wn/';
      return `${baseUrl}${iconId}@2x.png`;
    },
  },
};
</script>  