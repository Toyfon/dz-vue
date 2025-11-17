<script setup lang="ts">
import DismissIcon from '@/icons/dismiss-icon.vue'
import DoneIcon from '@/icons/done-icon.vue'
import type { CardWithStatuses, Status } from '@/data-contracts.ts'
import { computed, ref } from 'vue'

const props = defineProps<CardWithStatuses & { index: number }>()

const emit = defineEmits<{
    rollup: [word: string, status: Status]
    setPoints: [word: string, points: number, status: Status]
}>()

const finishedStatus = ref<Status | null>(null)

const rollup = () => {
    emit('rollup', props.word, props.status)
}

const setFinishedStatus = (newStatus: Status) => {
    finishedStatus.value = newStatus
    emit('setPoints', props.word, newStatus === 'success' ? 10 : -4, newStatus)
}
const showFlip = computed(
    () => props.state === 'closed' && props.status === 'pending' && !finishedStatus.value,
)
const showActions = computed(
    () => props.state === 'opened' && props.status === 'pending' && !finishedStatus.value,
)
const displayIndex = computed(() => props.index + 1)
</script>

<template>
    <div class="card" @click="rollup" v-flipped="state === 'opened'">
        <div class="card_number">{{ displayIndex }}</div>
        <div v-show="finishedStatus" class="finished-status">
            <DoneIcon v-show="finishedStatus === 'success'" style="width: 48px; height: 48px" />
            <DismissIcon v-show="finishedStatus === 'fail'" style="width: 48px; height: 48px" />
        </div>
        <div class="card_inner">
            <p class="card_face card_face--front" v-if="state === 'closed'">
                {{ word }}
            </p>
            <p class="card_face card_face--back" v-else>
                {{ translation }}
            </p>
        </div>
        <div v-show="showFlip" class="card_footer_text">Перевернуть</div>
        <div v-show="finishedStatus" class="card_footer_text">Завершить</div>
        <div class="answer_actions" v-show="showActions">
            <DismissIcon @click="setFinishedStatus('fail')" />
            <DoneIcon @click="setFinishedStatus('success')" />
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
}
.card.flipped .card_inner {
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
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;

    transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
    -webkit-transition: -webkit-transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.card_number {
    position: absolute;
    top: 22px;
    left: 38px;
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    width: 16px;
    height: 16px;
    z-index: 2;
    background: var(--color-white);
}

.card_face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    font-weight: 400;
    font-size: 18px;
    text-align: center;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 28px 19px;
    box-sizing: border-box;
}

.card_face--back {
    transform: rotateY(180deg);
}

.card_footer_text {
    position: absolute;
    bottom: 20px;
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
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--color-white);
    padding: 0 4px;
}

.finished-status {
    position: absolute;
    top: 4px;
    z-index: 2;
    right: 50%;
    transform: translateX(50%);
}
</style>
