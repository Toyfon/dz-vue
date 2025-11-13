<script setup lang="ts">
import Header from '@/components/header.vue'
import Card from '@/components/card.vue'
import { reactive } from 'vue'

const cardData = reactive({ id: 1, original: 'Example', translation: 'Пример', rolled: false })

function onRollup(id: number, rolled: boolean) {
    if (cardData.id === id) {
        cardData.rolled = rolled
    }
}
</script>

<template>
    <main class="main">
        <Header />
        <Card v-bind="cardData" @rollup="onRollup" />
    </main>
</template>

<style scoped>
.main {
    max-width: 1440px;
}
</style>
