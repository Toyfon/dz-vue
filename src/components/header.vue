<script setup lang="ts">
import Score from '@/components/score.vue'

const score = 100
</script>

<template>
    <header class="header">
        <h2 class="label_text">ЗАПОМНИ СЛОВО</h2>
        <Score :score="score" />
    </header>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 40px 64px;
}

.label_text {
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.12em;
}
</style>
