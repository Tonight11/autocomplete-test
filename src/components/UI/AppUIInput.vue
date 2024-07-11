<!-- src/components/SearchInput.vue -->
<template>
  <div class="search-input">
    <input
      type="text"
      v-model="query"
      @input="handleInput"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      placeholder="Введите имя игрока"
    />
    <AppUIAutocomplete
      v-if="showSuggestions && !loading"
      :suggestions="filteredSuggestions"
      :active-index="activeSuggestionIndex"
      :loading="loading"
      @select="handleSelect"
    />
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script setup>
import AppUIAutocomplete from './AppUIAutocomplete.vue'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useDataStore()
const { data: players } = storeToRefs(store)

const query = ref('')
const showSuggestions = ref(false)
const activeSuggestionIndex = ref(-1)
const loading = ref(false)
const debounce = ref(null)
const timer = 500

const handleInput = () => {
  clearTimeout(debounce.value)
  loading.value = true
  debounce.value = setTimeout(() => {
    if (query.value.length < 3) {
      showSuggestions.value = false
    } else {
      showSuggestions.value = true
    }
    loading.value = false
  }, timer)
}

const filteredSuggestions = computed(() => {
  return players.value
    .filter((player) =>
      player.name.toLowerCase().includes(query.value.toLowerCase())
    )
    .slice(0, 10)
})

const onArrowDown = () => {
  if (activeSuggestionIndex.value < filteredSuggestions.value.length - 1) {
    activeSuggestionIndex.value++
  }
}

const onArrowUp = () => {
  if (activeSuggestionIndex.value > 0) {
    activeSuggestionIndex.value--
  }
}

const onEnter = () => {
  if (activeSuggestionIndex.value >= 0) {
    handleSelect(filteredSuggestions.value[activeSuggestionIndex.value])
  }
}

const handleSelect = (suggestion) => {
  query.value = suggestion.name
  showSuggestions.value = false
  activeSuggestionIndex.value = -1
  router.push({ name: 'profile', params: { id: suggestion.id } })
}
</script>

<style scoped>
.search-input {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.search-input input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 11px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  outline: none;
}

.search-input input:focus {
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

.search-input input::placeholder {
  color: #aaa;
}

.search-input input:focus::placeholder {
  color: #ccc;
}
</style>
