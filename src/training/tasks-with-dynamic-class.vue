<!-- **Описание**: Создайте систему динамического отображения статусов задач с цветовой индикацией -->
<!-- **Входные данные**: Массив задач [{id: 1, title: 'Задача 1', status: 'pending'}, {id: 2, title: 'Задача 2', status: 'completed'}, {id: 3, title: 'Задача 3', status: 'in-progress'}] и переменная selectedTaskId для отслеживания выбранной задачи -->
<!-- **Выходные данные**: Список задач с динамическими классами для статусов и выделением выбранной задачи -->
<!-- **Ограничения**: -->
<!-- - Используйте v-bind:class для применения классов статусов -->
<!-- - Статус 'pending' должен иметь оранжевый цвет -->
<!-- - Статус 'completed' должен иметь зеленый цвет -->
<!-- - Статус 'in-progress' должен иметь синий цвет -->
<!-- - Выбранная задача должна иметь дополнительный класс 'selected' с рамкой -->
<!-- - Используйте computed свойство для определения классов каждой задачи -->
<!-- **Примеры**: -->
<!-- Input: selectedTaskId = 1, отображается список задач -->
<!-- Output: Первая задача выделена рамкой, цвета соответствуют статусам -->
<!-- Input: Пользователь кликает на задачу с id = 3 -->
<!-- Output: Третья задача становится выбранной с рамкой, остальные без рамки -->

<template>
    <div class="tasks">
        <div
            v-for="task in tasks"
            :key="task.id"
            :class="[taskClasses[task.id], { selected: selectedTaskId === task.id }]"
            @click="selectTask(task.id)"
        >
            <div class="title">{{ task.title }}</div>
            <div class="status-label">{{ task.status }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
interface Task {
    id: number;
    title: string;
    status: 'pending' | 'completed' | 'in-progress';
}
export default {
    setup() {
        const tasks = ref<Task[]>([
            { id: 1, title: 'Задача 1', status: 'pending' },
            { id: 2, title: 'Задача 2', status: 'completed' },
            { id: 3, title: 'Задача 3', status: 'in-progress' }
        ])

        const selectedTaskId = ref(1) // пример: по умолчанию выбрана задача 1
        const taskClasses = computed(() => {
            const map: Record<number, Record<string, boolean>> = {}
            tasks.value.forEach(t => {
                map[t.id] = {
                    'status-pending': t.status === 'pending',
                    'status-completed': t.status === 'completed',
                    'status-in-progress': t.status === 'in-progress'
                }
            })
            return map
        })
        const selectTask = (id: number) => {
            selectedTaskId.value = id
        }

        return {
            tasks,
            selectedTaskId,
            taskClasses,
            selectTask
        }
    }
}
</script>

<style scoped>
.tasks {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 480px;
}
.tasks > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    border-radius: 6px;
    cursor: pointer;
    color: #fff;
}

.status-pending { background: #e67e22; }
.status-completed { background: #27ae60; }
.status-in-progress { background: #2980b9; }

.selected {
    outline: 3px solid rgba(0,0,0,0.12);
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.title { font-weight: 600; }
.status-label { font-size: 12px; opacity: 0.95; }
</style>
