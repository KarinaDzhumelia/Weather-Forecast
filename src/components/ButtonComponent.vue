<template>
    <button class="week-button hovered" @click="goToPage">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      pagePath: {
        type: String,
        required: true,
      },
    },
    methods: {
      goToPage() {
        this.$router.push(this.pagePath);
      },
    },
  };
  </script>  