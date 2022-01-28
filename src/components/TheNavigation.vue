<template>
  <div id="nav">
    <AppLink id="logo" to="/">Logo</AppLink> 
    <AppLink 
        v-for="destination in destinations"
        :key="destination.id"
        :to="{name: 'Destination', params: {id: destination.id, slug: destination.slug}}"
    >
    {{ destination.name }}
    </AppLink>
    <AppLink :to="{name: 'Protected'}">Dashboard</AppLink>
    <AppLink to="https://next.router.vuejs.org/guide/advanced/navigation-guards.html#global-after-hooks">Vuejs</AppLink>
  </div>
</template>

<script>
import sourceData from '../../data/data.json'
export default {
  data() {
    return {
      destinations: sourceData.destinations
    }
  }
}
</script>