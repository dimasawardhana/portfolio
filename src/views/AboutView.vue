<script setup lang="ts">
import Cards from '@/components/ContentContainer.vue'
import Contacts from '@/components/About/SocialLinks.vue'
import AboutMe from '@/components/About/AboutMe.vue'
import MyExperience from '@/components/About/MyExperience.vue'
import SkillSet from '@/components/About/SkillSet.vue'

const topbarHeight = `${document.querySelector('.navbar')?.scrollHeight || 0}px`
</script>

<template>
  <div class="section">
    <div class="side-left">
      <Cards id="about-me" title="About Me">
        <AboutMe />
      </Cards>
      <div class="contacts">
        <Contacts />
      </div>
      <SkillSet />
    </div>
    <div class="side-right">
      <Cards id="portfolio">
        <MyExperience />
      </Cards>
    </div>
  </div>
</template>

<style>
.section {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: calc(100vh - calc(v-bind(topbarHeight) + 30px));
}
@media (min-width: 768px) {
  .section {
    grid-template-columns: 1fr 2fr;
  }
}
.contacts {
  display: grid;
  grid-template-columns: auto auto auto auto;
}
.side-left {
  display: grid;
  grid-template-rows: auto auto;
  grid-auto-rows: auto;
  padding: 10px;
}
.side-right {
  padding: 10px;
  display: grid;
  grid-template-rows: auto;
  max-height: calc(100vh - v-bind(topbarHeight));
}
</style>
