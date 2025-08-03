<template>
    <div>
        <PUButton icon-left="backward" @click="$router.back()" flavor="ghost">
            Back
        </PUButton>
        <Post v-if="post" :post="post" />
    </div>
</template>

<script setup lang="ts">
const { params } = useRoute()
const { data: post } = await useFetch<Post>(`/api/posts/${params.id}`, { key: `post-${params.id}`, transform: (post) => ({ ...post, publishedAt: new Date(post.publishedAt), replays: post.replays?.map(replay => ({ ...replay, publishedAt: new Date(replay.publishedAt) })) }) })

useHead({
    title: `Post Office - ${post?.value?.author.name} Post`,
    meta: [
        { name: 'description', content: post.value?.text }
    ]
})
</script>