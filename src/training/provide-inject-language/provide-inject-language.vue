<!--

// **Описание**: Создайте систему централизованного управления настройками пользователя с
использованием provide/inject и Symbol ключей
// **Входные данные**: Корневой компонент
предоставляет объект настроек { language: 'ru', fontSize: 16, notifications: true } через provide с Symbol ключом, дочерний компонент получает настройки через inject
// **Выходные данные**:Дочерний компонент отображает текущие настройки и кнопки для их изменения, изменения отражаются во всех компонентах
// **Ограничения**:
// - Создайте Symbol ключ для уникальной идентификации настроек - Используйте provide в корневом компоненте с Symbol ключом
// - Используйте inject в дочернем компоненте с тем же Symbol ключом
// - Реализуйте функции изменения каждой настройки
// - Настройки должны быть реактивными и обновляться во всех компонентах //
// **Примеры**:
// Input:language = 'ru', fontSize = 16, отображаются настройки
// Output: Показывается "Язык: Русский,Размер шрифта: 16px, Уведомления: включены" //
// Input: Пользователь нажимает кнопку смены языка
// Output: language изменяется на 'en', интерфейс обновляется на "Language: English"
-->
<script setup lang="ts">
import SettingsPanel from '@/training/provide-inject-language/settings-panel.vue'

import { provide, reactive } from 'vue'

export const SETTINGS_KEY = Symbol('user-settings')

export const settings = reactive({
    language: 'ru' as 'ru' | 'en',
    fontSize: 16,
    notifications: true,
})

provide(SETTINGS_KEY, settings)
</script>

<template>
    <div class="root">
        <h2>Корневой компонент (провайдер)</h2>

        <SettingsPanel />

        <section class="mirror">
            <h3>Отражение настроек в корне</h3>
            <p v-if="settings.language === 'ru'">Язык: Русский</p>
            <p v-else>Language: English</p>
            <p>Размер шрифта: {{ settings.fontSize }}px</p>
            <p>Уведомления: {{ settings.notifications ? 'включены' : 'выключены' }}</p>
        </section>
    </div>
</template>

<style scoped>
.root {
    font-family: Arial, sans-serif;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
}
.mirror {
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px dashed #ccc;
}
</style>
