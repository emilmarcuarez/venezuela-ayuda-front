<template>
  <div class="profile-page">
    <MainNavbar />

    <main class="profile-container">
      <ProfileInfo />
      <ProfileDonations />
      <ProfilePetitions />
    </main>

    <MainFooter />
  </div>
</template>

<script setup>
import MainNavbar from '../components/MainNavbar.vue';
import MainFooter from '../components/MainFooter.vue';
import ProfileInfo from '../components/ProfileInfo.vue';
import ProfileDonations from '../components/ProfileDonations.vue';
import ProfilePetitions from '../components/ProfilePetitions.vue';
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
}

.profile-container {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
</style>
