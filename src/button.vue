<script setup lang="ts">

</script>

<template>
    <button class="button">
        <slot/>
    </button>
</template>

<style scoped>
.button {
    border: none;
    border-radius: 10px;
    padding: 14px ;
    background: var(--color-bg-card);
    font-family: var(--font-main), sans-serif;
    font-size: 20px;
    font-weight: 600;
    color: var(--color-primary);
    cursor: pointer;
    transition: background 0.2s ease;
}

.button:hover {
    background: var(--color-secondary);
}
</style>
