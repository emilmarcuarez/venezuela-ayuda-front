<template>
  <div class="home-page">
    <MainNavbar />
    <MainHero />
    <UrgentCategories />
    <ImpactPetitions />
    <ImpactMovement />
    <CallToAction />
    <MainFooter />
  </div>
</template>

<script setup>
import MainNavbar from '../components/MainNavbar.vue';
import MainHero from '../components/MainHero.vue';
import UrgentCategories from '../components/UrgentCategories.vue';
import ImpactPetitions from '../components/ImpactPetitions.vue';
import ImpactMovement from '../components/ImpactMovement.vue';
import CallToAction from '../components/CallToAction.vue';
import MainFooter from '../components/MainFooter.vue';
</script>

<style scoped>
.home-page {
  background-color: var(--color-bg-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
