<script lang="ts">
import { ref, onMounted, onUnmounted, onBeforeUpdate } from 'vue'

export default {
    name: 'CountdownTimer',
    props: {
        startTime: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        // Ваш код здесь
        const timeLeft = ref(props.startTime)
        let timer: number | undefined
        const formatTime = (seconds: number) => {
            const mins = Math.floor(seconds / 60)
                .toString()
                .padStart(2, '0')
            const secs = (seconds % 60).toString().padStart(2, '0')
            return `${mins}:${secs}`
        }

        onBeforeUpdate(() => {})
        onMounted(() => {
            timer = window.setInterval(() => {
                if (timeLeft.value > 0) {
                    timeLeft.value -= 1
                } else {
                    clearInterval(timer)
                }
            }, 1000)
        })
        onUnmounted(() => {
            if (timer) {
                clearInterval(timer)
            }
        })
        return {
            timeLeft,
            formatTime,
        }
    },
}
</script>

<template>
    <div>
        <div v-if="timeLeft > 0">{{ formatTime(timeLeft) }}</div>
        <div v-else>Время вышло!</div>
    </div>
</template>

<style scoped></style>

<!-- **Описание**: Создайте Vue 3 компонент, который использует хук onMounted для инициализации таймера обратного отсчета -->
<!-- **Входные данные**: Компонент должен принимать prop startTime (число секунд для обратного отсчета) -->
<!-- **Выходные данные**: Отображение текущего значения таймера в формате MM:SS и сообщение "Время вышло!" когда таймер достигает нуля -->
<!-- **Ограничения**: -->
<!-- - Используйте Composition API с функцией setup() -->
<!-- - Обязательно используйте onMounted для запуска таймера -->
<!-- - Обязательно используйте onUnmounted для очистки таймера -->
<!-- - Таймер должен обновляться каждую секунду -->
<!-- - startTime должно быть положительным числом -->
<!-- -->
<!-- Input: startTime = 65 -->
<!-- Output: Отображение "01:05", затем "01:04", "01:03"... до "00:00" и "Время вышло!" -->
<!-- -->
<!-- Input: startTime = 10 -->
<!-- Output: Отображение "00:10", затем "00:09", "00:08"... до "00:00" и "Время вышло!" -->
