<template>
  <v-app>
    <v-main class="px-16">
      <v-container fluid>



        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">

</script>

<style>

</style>

<!--
 First start
 do terminalu:
    npm install
    npm install axios
    npm run dev

  jina moznost
  ------
  create vue project
  npm init vue@latest
  npm install @vue/cli -g

  vue add vuetify
  ------


 kdyz neco z toho nejde, pomuze dodat na konec --force
 :D

 - views jsou screeny /home, /login...
 - store bude databazka
 - router je navigace, kde je definovana /home, /login...
 - plugins neni treba resit == dependency
 - components jsou prvky na strance, kde si je muzeme rozdelit
   --- navbar, searchbar...
 - assets jsou obrazky

  Firebase:

  firebase  emulators:start
 -->
