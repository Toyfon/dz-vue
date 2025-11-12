<script setup lang="ts">
  const date = new Date();
</script>

<template>
    <main>
        Сегодняшняя дата: {{ date.toDateString() }}
    </main>
</template>

<style scoped></style>
