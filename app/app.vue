<template>
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Post Office',
  meta: [
    { name: 'description', content: 'where you can post things' }
  ],
})
</script>
