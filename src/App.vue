<template>
  <TheNavigation />
  <div class="container">
  <!-- <router-view v-slot="{Component}">
    <transition name="moveUp"> 
      <component :key="$route.path" :is="Component"></component>
    </transition>
  </router-view> -->
  <router-view :key="$route.path"/>
  </div>
</template>


<script>
import TheNavigation from './components/TheNavigation.vue'
export default {
  components: {TheNavigation}
}
</script>

<style lang="css">
  #nav .now-active{
    color: red;
    border-bottom: 2px solid red
  }

  .moveUp-enter-active,
  .moveUp-leave-active{
    animation: fadeIn 0.3s ease-in
  }

  @keyframes fadeIn {
    0%{ opacity : 0;}
    50%{ opacity: 0.5;}
    100%{ opacity: 1;}
  }

  
</style>
