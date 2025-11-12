<script setup lang="ts">
  import Button from '@/button.vue'

  const date = new Date();
</script>

<template>
    <main>
        Сегодняшняя дата: {{ date.toDateString() }}
    </main>
    <Button>Нажми меня</Button>
</template>

<style scoped></style>
