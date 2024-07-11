<template>
  <ul class="autocomplete-suggestions">
    <li
      v-for="(suggestion, index) in suggestions"
      :key="suggestion.id"
      :class="{ 'is-active': index === activeIndex }"
      @click="() => $emit('select', suggestion)"
    >
      {{ suggestion.name }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  suggestions: Array,
  activeIndex: Number,
  loading: Boolean,
})
</script>

<style scoped>
.autocomplete-suggestions {
  position: absolute;
  width: 100%;
  border-radius: 4px;
  background-color: #464646;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  margin: 0;
  padding: 0;
  list-style-type: none;
  color: white;
}

.autocomplete-suggestions li {
  padding: 12px 16px;
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.2s;
}

.autocomplete-suggestions li:hover {
  background-color: #393939;
}

.autocomplete-suggestions li.is-active {
  background-color: #393939;
  font-weight: bold;
}

.autocomplete-suggestions li:active {
  background-color: #393939;
  transform: scale(0.98);
}
</style>
