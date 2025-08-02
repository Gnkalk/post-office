<template>
    <div>
        <PostPoster class="mb-4" />
        <p v-if="pending">Loading...</p>
        <Post v-else v-for="post in posts" :key="post.id" :post="post" />
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Post Office - Posts',
})


const { data: posts, pending } = await useFetch('/api/posts', {
    lazy: true, key: 'posts', transform: (data) => data.map(post => ({ ...post, publishedAt: new Date(post.publishedAt) }))
})
</script>