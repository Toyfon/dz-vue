<script setup lang="ts">
import { inject } from 'vue'
import { settings, SETTINGS_KEY } from './provide-inject-language.vue'

const s = inject<typeof settings>(SETTINGS_KEY, {
    language: 'ru',
    fontSize: 16,
    notifications: true,
} as typeof settings)
if (!s) throw new Error('Settings not provided')

function toggleLanguage() {
    s.language = s.language === 'ru' ? 'en' : 'ru'
}

function increaseFont() {
    s.fontSize += 1
}

function decreaseFont() {
    s.fontSize = Math.max(8, s.fontSize - 1)
}

function toggleNotifications() {
    s.notifications = !s.notifications
}
</script>

<template>
    <div class="panel">
        <h3>Панель настроек (инжект)</h3>
        <p v-if="s.language === 'ru'">Язык: Русский</p>
        <p v-else>Language: English</p>

        <p>Размер шрифта: {{ s.fontSize }}px</p>
        <div class="font-controls">
            <button @click="decreaseFont">-</button>
            <button @click="increaseFont">+</button>
        </div>

        <p>Уведомления: {{ s.notifications ? 'включены' : 'выключены' }}</p>
        <button @click="toggleNotifications">Переключить уведомления</button>

        <div class="actions">
            <button @click="toggleLanguage">Сменить язык</button>
        </div>
    </div>
</template>

<style scoped>
.panel {
    padding: 12px;
    border: 1px solid #eee;
    margin-bottom: 12px;
}
.font-controls button,
.actions button {
    margin-right: 8px;
}
</style>
