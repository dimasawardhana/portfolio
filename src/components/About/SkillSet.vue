<script setup lang="ts">
import ContentContainer from '../ContentContainer.vue'
import IconNext from '../icons/IconNext.vue'
import IconPostgresql from '../icons/IconPostgresql.vue'
import IconReact from '../icons/IconReact.vue'
import IconNodejs from '../icons/IconNodejs.vue'
import IconTypescript from '../icons/IconTypescript.vue'
import IconGolang from '../icons/IconGolang.vue'
</script>

<template>
  <ContentContainer>
    <div class="skill-set">
      <h3>Skills</h3>
      <div class="set">
        <i><IconReact /></i>
        <i><IconNext /></i>
        <i><IconPostgresql /></i>
        <i><IconNodejs /></i>
        <i><IconTypescript /></i>
        <i><IconGolang /></i>
      </div>
    </div>
  </ContentContainer>
</template>

<style lang="css" scoped>
.skill-set {
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  height: 100%;
}
.set {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  align-self: center;
  font-size: 2em;
}
</style>
