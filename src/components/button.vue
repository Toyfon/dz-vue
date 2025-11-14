<script setup lang="ts"></script>

<template>
    <button class="button">
        <slot />
    </button>
</template>

<style scoped>
.button {
    border: none;
    border-radius: 100px;
    padding: 16px 10px;
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: 400;
    font-size: 24px;
    line-height: 1.5;
    cursor: pointer;
    transition: opacity 0.2s ease;
}

.button:hover {
    background: var(--color-primary);
    opacity: 0.7;
}
</style>
