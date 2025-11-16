<script setup lang="ts">
import AppAppHeader from '@/components/app-header.vue'
import { onMounted, ref } from 'vue'
import type { Card, CardWithStatuses, Status } from '@/data-contracts.ts'
import CardsList from '@/components/cards-list.vue'
// import CountdownTimer from '@/trening.vue'
import Button from '@/components/button.vue'

const API_URL = 'http://localhost:8080/api/random-words'
const cards = ref<CardWithStatuses[]>()

const totalPoints = ref<number>(0)

const gameStarted = ref<boolean>(false)

const load = ref<boolean>(false)

function onRollup(word: string, status: Status) {
    if (!cards.value) return
    const cardData = cards.value.find((card) => card.word === word)
    if (cardData && status === 'pending') {
        cardData.state = 'opened'
    }
}

function setPoints(word: string, points: number, status: Status) {
    totalPoints.value += points
    cards?.value?.map((card: Card) => (card.word === word ? { ...card, status } : card))
}

async function startGame(): Promise<void> {
    load.value = true
    gameStarted.value = true

    try {
        const res = await fetch(API_URL)
        console.log(res)
        if (!res.ok) {
            throw new Error(`Ошибка загрузки данных: ${res.statusText}`)
        }
        const cardsRes:Card[] = await res.json()
        cards.value = cardsRes.map(card => ({
            ...card,
            state: 'closed',
            status: 'pending',
        }))
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error)
    } finally {
        load.value = false
    }
}

</script>

<template>
    <main class="main">
        <AppAppHeader :totalPoints="totalPoints" />

        <div class="content">
            <Button @click="startGame" v-if="!gameStarted" class="start-button">
                Начать игру
            </Button>
            <CardsList v-if="cards" :cards="cards" @rollup="onRollup" @setPoints="setPoints" />
        </div>


    </main>
</template>

<style scoped>
.main {
    max-width: 1440px;
    height: 100%;
}
.content {
    min-height: calc(100vh - 130px);
    display: flex;
    align-items: center;
}
.start-button {
    margin: 0 auto;
    width: 335px;
    height: 68px;
}
</style>
