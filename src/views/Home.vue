<template>
  <NavBar />
  <!--
  <FontStylesBar
    :search-ref="searchRef"
  />
  -->
  <HomeStyleCards
    :search-ref="searchRef"
  />


</template>

<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue'
  import NavBar from "@/components/NavBar.vue";
  import FontStylesBar from "@/components/FontStylesBar.vue";
  import HomeStyleCards from "@/views/HomeStyleCards.vue";
  import {ref} from "vue";


  const searchRef = ref("")
</script>

