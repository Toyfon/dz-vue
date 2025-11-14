<script setup lang="ts">
import AppAppHeader from '@/components/app-header.vue'
import { ref } from 'vue'
import type { Card, Status } from '@/data-contracts.ts'
import CardsList from '@/components/cards-list.vue'

const cards = ref<Card[]>([
    { word: 'Example', translation: 'Пример', state: 'closed', status: 'pending' },
    { word: 'Test', translation: 'Тест', state: 'closed', status: 'pending' },
    { word: 'Sample', translation: 'Образец', state: 'closed', status: 'pending' },
    { word: 'Demo', translation: 'Демо', state: 'closed', status: 'pending' },
])

const totalPoints = ref<number>(0)

function onRollup(word: string, status: Status) {
    const cardData = cards.value.find((card) => card.word === word)
    if (cardData && status === 'pending') {
        cardData.state = 'opened'
    }
}


function answerRight() {}
function answerWrong() {}

</script>

<template>
    <main class="main">
        <AppAppHeader :totalPoints="totalPoints" />
        <CardsList :cards="cards" @rollup="onRollup" />
    </main>
</template>

<style scoped>
.main {
    max-width: 1440px;
    margin: 0 auto;
}
</style>
