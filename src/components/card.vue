<script setup lang="ts">
import DismissIcon from '@/icons/dismiss-icon.vue'
import DoneIcon from '@/icons/done-icon.vue'
import type { Card, Status } from '@/data-contracts.ts'
import { computed, ref } from 'vue'

const props = defineProps<Card & { index: number }>()

const emit = defineEmits<{
    rollup: [word: string, status: Status]
}>()

const finishedStatus = ref<Omit<Status, 'pending'> | null>(null)

const rollup = () => {
    console.log('rollup')
    emit('rollup', props.word, props.status)
}

const setFinishedStatus = (newStatus: Omit<Status, 'pending'>) => {
    finishedStatus.value = newStatus
    // emit('rollup', word, newStatus)
}
const showFlip = computed(() => props.state === 'closed' && props.status === 'pending' && !finishedStatus.value)
const showActions = computed(() => props.state === 'opened' && props.status === 'pending' && !finishedStatus.value)
const displayIndex = computed(() => props.index + 1)
</script>

<template>
    <div class="card" @click="rollup" :class="{ flipped: state === 'opened' }">
        <div class="card_inner">
            <div class="card_number">{{ displayIndex }}</div>
            <div v-show="finishedStatus" class="finished-status">
                <DoneIcon v-show="finishedStatus === 'success'" style="width: 48px; height: 48px;" />
                <DismissIcon v-show="finishedStatus === 'fail'" style="width: 48px; height: 48px;" />
            </div>
            <p class="main_text">
                {{ state === 'opened' ? translation : word }}
            </p>
            <div v-show="showFlip" class="card_footer_text">Перевернуть</div>
            <div v-show="finishedStatus" class="card_footer_text">Завершить</div>
            <div class="answer_actions" v-show="showActions">
                <DoneIcon @click="setFinishedStatus('success')" />
                <DismissIcon @click="setFinishedStatus('fail')" />
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

.finished-status {
    position: absolute;
    top: -24px;
    right: 50%;
    transform: translateX(50%);
}
</style>
