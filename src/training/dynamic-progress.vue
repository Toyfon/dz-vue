<!--
// **Описание**: Создайте систему отображения статистики производительности с динамическими индикаторами прогресса
//
// **Входные данные**: Массив метрик производительности [{id: 1, name: 'CPU Usage', value: 75, threshold: 80}, {id: 2, name: 'Memory', value: 45, threshold: 70}, {id: 3, name: 'Disk I/O', value: 90, threshold: 85}] и переменная selectedMetricId для отслеживания выбранной метрики
//
// **Выходные данные**: Список метрик с цветовыми индикаторами состояния и выделением выбранной метрики
//
// **Ограничения**:
// - Используйте v-bind:class для динамического применения классов состояний
// - Значение ниже threshold должно иметь зеленый цвет (класс 'normal')
// - Значение равное или выше threshold должно иметь красный цвет (класс 'warning')
// - Выбранная метрика должна иметь дополнительный класс 'highlighted' с синей рамкой
// - Используйте computed свойство для определения классов каждой метрики
//
// Input: selectedMetricId = 1, отображается список метрик
// Output: CPU Usage выделена синей рамкой и имеет зеленый цвет, Memory зеленый, Disk I/O красный
//
// Input: Пользователь кликает на метрику Memory (id = 2)
// Output: Memory становится выбранной с синей рамкой, остальные без рамки
-->

<script setup lang="ts">
import { computed, ref } from 'vue'

type Metric = { id: number; name: string; value: number; threshold: number }

const { metrics, initialSelectedId } = defineProps<{
    metrics: Metric[]
    initialSelectedId: number
}>()

const selectedMetricId = ref<number | null>(initialSelectedId)

const metricClasses = computed(() => {
    const result: Record<number, Record<string, boolean>> = {}
    metrics.forEach((m) => {
        result[m.id] = {
            normal: m.value < m.threshold,
            warning: m.value >= m.threshold,
            highlighted: selectedMetricId.value === m.id,
        }
    })
    return result
})

function selectMetric(id: number) {
    selectedMetricId.value = id
}
</script>

<template>
    <div class="performance-stats">
        <h3>Performance Metrics</h3>
        <ul class="metrics-list">
            <li
                v-for="metric in metrics"
                :key="metric.id"
                class="metric"
                :class="metricClasses[metric.id]"
                @click="selectMetric(metric.id)"
                role="button"
                tabindex="0"
            >
                <div class="meta">
                    <span class="name">{{ metric.name }}</span>
                    <span class="value">{{ metric.value }}%</span>
                </div>
                <div class="progress-rail" aria-hidden="true">
                    <div
                        class="progress-bar"
                        :style="{ width: metric.value + '%' }"
                    ></div>
                </div>
                <div class="threshold">threshold: {{ metric.threshold }}%</div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.performance-stats {
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
.metrics-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 12px;
}


.metric {
    padding: 12px;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.04) inset;
    transition: box-shadow 0.15s, transform 0.08s;
}

/* выбранная метрика — синяя рамка */
.highlighted {
    box-shadow: 0 0 0 2px rgba(13,110,253,0.2), 0 2px 8px rgba(0,0,0,0.06);
    border-radius: 8px;
}
.metric:active {
    transform: translateY(1px);
}

/* состояния значений */
.normal .progress-bar {
    background: #28a745; /* зелёный */
}

.warning .progress-bar {
    background: #dc3545; /* красный */
}
/* структура внутри элемента */
.meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-weight: 600;
}
.progress-rail {
    background: #f1f3f5;
    border-radius: 6px;
    height: 10px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    width: 0%;
    transition: width 0.5s ease;
    background: #28a745;
}

.threshold {
    margin-top: 8px;
    color: #6c757d;
    font-size: 12px;
}
</style>
