<template>
  <div>
    <h1>404 - Page not found</h1>
    <p>Sorry, this page does not exist.</p>
    <ButtonComponent :pagePath="'/'">Go home</ButtonComponent>
  </div>
</template>
  
<script>
import ButtonComponent from '@/components/ButtonComponent.vue';

export default {
  name: 'NotFound',
  components: {
      ButtonComponent,
  },
};
</script>
  