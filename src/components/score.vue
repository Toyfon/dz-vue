<script setup lang="ts">
import HeartIcon from '@/icons/heart-icon.vue'

const { score } = defineProps<{ score: number }>()
</script>

<template>
    <div class="score">
        {{ score }}
        <HeartIcon />
    </div>
</template>

<style scoped>
.score {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 36px;
    padding: 12px 24px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    color: var(--color-primary);
    background-color: var(--color-primary-light);
    box-shadow: var(--shadow);
}
</style>
