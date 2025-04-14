<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/NavbarLinks.vue'
import { useGtm } from '@gtm-support/vue-gtm'

// Initialize GTM
const gtm = useGtm()
gtm?.enable(true)
</script>

<template>
  <noscript>
    <iframe
      src="https://www.googletagmanager.com/ns.html?id=G-R9YW49PE9Q"
      height="0"
      width="0"
      style="display: none; visibility: hidden"
    ></iframe>
  </noscript>

  <Navbar />

  <RouterView />
</template>
