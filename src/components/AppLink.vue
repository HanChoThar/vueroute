<template>
  <a 
  v-if="external"
  :href="to"
  target="_blannk"
  >
    <slot/>
  </a>

  <router-link
  v-else
  v-bind="$props">
    <slot/>
  </router-link>
</template>

<script>
import { RouterLink } from 'vue-router'
export default {
  props: {
    ...RouterLink.props
  },
  computed: {
    external() {
      return typeof this.to === 'string' && this.to.startsWith('http')
    }
  }
}
</script>