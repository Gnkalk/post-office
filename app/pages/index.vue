<template>
    <div>
        <PostPoster class="mb-4" />
        <p v-if="pending">Loading...</p>
        <article class="border-2 border-stone-900 p-4 rounded-lg mb-1" v-else v-for="post in posts" :key="post.id">
            <PostUser :user="post.author" />
            <NuxtLink :to="`/${post.id}`">
                <p class="text-2xl">{{ post.text }}</p>
            </NuxtLink>
        </article>
    </div>
</template>

<script setup lang="ts">
const { data: posts, pending } = await useFetch('/api/posts', { lazy: true })
</script>