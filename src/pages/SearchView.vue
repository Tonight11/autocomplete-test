<template>
  <div class="search-wrapper">
    <AppUIInput v-model:query="query" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppUIInput from '@/components/UI/AppUIInput.vue'

const query = ref('')
</script>

<style scoped>
.search-wrapper {
  position: relative;
}
</style>
