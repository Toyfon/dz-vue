<script setup lang="ts">
import type { Card, State, Status } from '@/data-contracts.ts'
import WordCard from './card.vue'

const { cards } = defineProps<{
    cards: Array<Card>
}>()

const emit = defineEmits<{
    rollup: [word: string, status: Status]
}>()
</script>

<template>
    <div class="card_list" v-show="cards.length">
        <WordCard
            v-for="(card, index) in cards"
            :key="card.word"
            v-bind="card"
            :index="index"
            @rollup="(word, status) => emit('rollup', word, status)"
        />
    </div>
</template>

<style scoped>
.card_list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    padding: 50px 64px;
}
</style>
