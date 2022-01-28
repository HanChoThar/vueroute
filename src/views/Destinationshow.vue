<template>
<div>
<goBack/>
<section class="destination">
    <h1>{{ destination.name }}</h1>
    <div class="destination-details">
      <img :src="`/images/${destination.image}`" :alt="destination.name">
      <p>{{ destination.description }}</p>
    </div>
  </section>
  <section class="experiences">
    <h2>Top Experiences in {{ destination.name }}</h2>
    <div class="cards">
      <router-link
      v-for="experience in destination.experiences"
      :key="experience.slug"
      :to="{name: 'experience.show', params: {experienceSlug: experience.slug}}"
      >
        <experience-card
        :experience="experience"
        />
      </router-link>
    </div>
    <div>
    <router-view />
    </div>
  </section>
</div>

</template>

<script>
import sourceData from '../../data/data.json'
import ExperienceCard from '../components/ExperienceCard.vue'
import goBack from '../components/Goback.vue'
export default {
  components: { ExperienceCard, goBack },
  props: {
    id: {type: Number, required: true}
  },
  computed: {
    destination() {
      return sourceData.destinations.find(destination => destination.id == this.id)
    }
  }
}
</script>

<style>

</style>