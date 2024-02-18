<template>
  <div id="app">
    <HeaderComponent/>
    <input type="text" placeholder="Search" v-model.lazy="city" @keyup.enter="fetchGeo" v-show="showInput">
    <div class="error" v-if="errorCheck === true">Invalid city name. Please enter a valid city.</div>
    <div v-else>
      <transition name="fade" mode="out-in">
        <router-view :lat="lat" :lon="lon" :apiKey="apiKey"/>
      </transition>
    </div>
  </div>
</template>

<script>
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import Swal from 'sweetalert2';

  export default {
    name: 'app',
    components: {
      HeaderComponent,
    },
    data () {
      return {
        apiKey: 'a8d599f6287f9b5534c52fbe85ec9645',
        url_geo: 'https://api.openweathermap.org/geo/1.0/direct?',
        city: '',
        lat: '',
        lon: '',
        errorCheck: false
      }
    },
    mounted() {
      this.getUserLocation();
    },
    methods: {
      async fetchGeo() {
        try {
          const res = await fetch(`${this.url_geo}q=${this.city}&appid=${this.apiKey}`);

          if (!res.ok) {
            throw new Error(`Failed to fetch geo data. Status: ${res.status}`);
          }

          const results = await res.json();

          if (results.length === 0) {
            throw new Error('No results found for the city');
          }

          this.errorCheck = false;
          this.lat = results[0].lat;
          this.lon = results[0].lon;
          this.city = '';
        } catch (error) {
          console.error('Error fetching geo data:', error);
          this.errorCheck = true;

          if (error instanceof Error && error.message !== 'No results found for the city'){
            this.errorCheck = false;
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong',
            });
          }
        }
      },
      getUserLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.lat = position.coords.latitude;
              this.lon = position.coords.longitude;
            },
            (error) => {
              console.error('Error getting geolocation:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported in this browser.');
        }
      },
    },
    computed: {
      showInput() {
        const routePath = this.$route.path;
        return routePath === '/' || routePath === '/week';
    },
    }
  }
</script>
