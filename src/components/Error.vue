<script setup lang="ts">
defineProps<{
  message: string;
}>()
</script>

<template>
  <div class="error">
    <h3>{{ message }}</h3>
  </div>
</template>

<style scoped>
.error {
  border-radius: 5px;
  background-color: #f2dede;
  padding: 0.5em 1.5em;
  color: #a94442;
  font-weight: bold;
  margin: 2em 0;
}
</style>
