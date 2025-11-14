<script setup lang="ts">
import DismissIcon from '@/icons/dismiss-icon.vue'
import DoneIcon from '@/icons/done-icon.vue'

interface CardProps {
    original: string
    translation: string
    rolled: boolean
    id: number
}

const { original = '', translation = '', rolled = false, id } = defineProps<CardProps>()

const emit = defineEmits<{
    rollup: [id: number, rolled: boolean]
}>()

const rollup = () => {
    console.log('rollup')
    emit('rollup', id, !rolled)
}
</script>

<template>
    <div class="card" @click="rollup" :class="{ flipped: rolled }">
        <div class="card_inner">
            <div class="card_number">{{ id }}</div>
            <p class="main_text">
                {{ rolled ? translation : original }}
            </p>
            <div v-if="!rolled" class="card_footer_text">Перевернуть</div>

            <div class="answer_actions" v-else>
                <DoneIcon />
                <DismissIcon />
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border-radius: 16px;
    width: 250px;
    height: 376px;
    box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
    background: var(--color-white);
    padding: 28px 19px;
    cursor: pointer;
    perspective: 1200px;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);
}
.card.flipped {
    transform: rotateY(180deg);
}
.card_inner {
    border: 1px solid #cce8ff;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.card_number {
    position: absolute;
    top: -8px;
    left: 16px;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    width: 16px;
    height: 16px;
    background: var(--color-white);
}

.main_text {
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    user-select: none;
}

.card_footer_text {
    position: absolute;
    bottom: -9px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-white);
    padding: 0 4px;
    height: 18px;
    font-weight: 700;
    font-size: 12px;
    line-height: 150%;
    letter-spacing: 0.12em;
}

.answer_actions {
    position: absolute;
    display: flex;
    gap: 32px;
    align-items: center;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-white);
    padding: 0 4px;
}
</style>
