<template>
  <div>
    <h1>Профиль игрока</h1>
    <p>ID: {{ player.id }}</p>
    <p>Имя: {{ player.name }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/data'

const props = defineProps({
  id: String
})

const player = ref({})
const store = useDataStore()
const { data: players } = storeToRefs(store)

onMounted(() => {
  player.value = players.value.find((p) => p.id === parseInt(props.id))
})
</script>
