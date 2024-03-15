<template>
  <div class="d-flex">
    <v-text-field
      variant="solo"
      density="comfortable"
      v-model="searchText"
      prepend-inner-icon="mdi-magnify"
      label="Search Font"
      hide-details
    ></v-text-field>
    <v-btn size="large"
           variant="tonal"
           @click="searchFont"
           class="ml-2">
      SEARCH
    </v-btn>

  </div>


</template>

<script setup>
import {ref} from "vue";

const emit = defineEmits(['search'])
const searchText = ref("");

const searchFont = () => {
  if (searchText.value.length > 0){
    emit("search", searchText.value.toLowerCase())
  }
};

</script>



/*
variant="solo"
density="comfortable"
v-model="searchText"
prepend-inner-icon="mdi-magnify"
label="Search"
hide-details  */

<style>


</style>
