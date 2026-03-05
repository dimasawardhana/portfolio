<script setup lang="ts">
import Contacts from '@/components/About/SocialLinks.vue'
import AboutMe from '@/components/About/AboutMe.vue'
import MyExperience from '@/components/About/MyExperience.vue'
import SkillSet from '@/components/About/SkillSet.vue'
</script>

<template>
  <div class="about-page">
    <div class="section-top">
      <div class="profile-layout">
        <div class="profile-main">
          <h1 class="page-title">About</h1>
          <AboutMe />
        </div>
        
        <div class="profile-sidebar">
          <div class="mini-section">
            <h3 class="mini-heading">Skills</h3>
            <SkillSet />
          </div>

          <div class="mini-section">
            <h3 class="mini-heading">Connect</h3>
            <div class="contacts">
              <Contacts />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="section-bottom">
      <MyExperience />
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1280px; 
  margin: 0 auto;
  /* Make the exact height of the screen */
  height: 100vh;
  padding: 6.5rem 1rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* Prevent scrolling at the page root */
  overflow: hidden;
}

.section-top {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.section-bottom {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  min-height: 0; /* Important for preventing flex children from blowing out container */
  position: relative;
}

.profile-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-main {
  display: flex;
  flex-direction: column;
}

.profile-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.page-title {
  font-size: 1.8rem;
  color: var(--color-heading);
  margin: 0 0 1rem 0;
  font-weight: 600;
  text-align: left;
}

@media (min-width: 768px) {
  .profile-layout {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
  }
}

.mini-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mini-heading {
  font-size: 1.8rem;
  color: var(--color-heading);
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.contacts {
  /* This neatly contains the SocialLinks which already formats itself as a column */
  width: 100%;
}
</style>
