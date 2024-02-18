<template>
    <header class="weather-header" @click="goHome">
      <div class="logo">
        <img src="@/assets/weather-logo.png" alt="Weather Logo" />
      </div>
      <div class="title">
        <h1>Weather Forecast</h1>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    methods: {
      goHome() {
        this.$route.path !== '/' && this.$router.push('/');
      },
    }
  };
  </script> 