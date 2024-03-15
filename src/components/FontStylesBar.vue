<template>
  <v-app-bar :elevation="2" app>
    <v-container class="d-flex align-content-center font-weight-light">
      <v-row>
        <v-col cols="2" class="d-flex align-center text-right fill-height">
          <SearchBar @search="searchFont" class="searchBar"/>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="2" class="d-flex align-center text-right fill-height">
          <v-toolbar-title class="title">
          </v-toolbar-title>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script setup>
import SearchBar from "@/components/SearchBar.vue";

const props = defineProps(['searchRef'])
</script>
<style>
  .menu-item{
    display: flex;
    align-content: center;
    align-text: right;
    height: fit-content;
  }

  @font-face {
    font-family: 'Pretendard light';
    src: url('../fonts/PretendardStd-Light.woff') format('truetype');
  }
  .title {
    font-family: "Pretendard light";
    font-size: 16px;
  }

</style>

