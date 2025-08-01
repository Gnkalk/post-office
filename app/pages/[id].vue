<template>
    <div>
        <PUButton icon-left="backward" @click="$router.back()" flavor="ghost">
            Back
        </PUButton>
        <article class="border-2 border-stone-900 p-4 rounded-lg mb-1" v-if="post">
            <PostUser :user="post.author" />
            <p class="text-2xl">{{ post.text }}</p>
            <PostPoster :replay-to="{
                id: post.id,
                name: post.author.name
            }" class="my-4" />
            <article class="border-2 border-stone-900 p-4 rounded-lg mb-1" v-if="post.replays"
                v-for="reply in post.replays" :key="reply.id">
                <PostUser :user="reply.author" />
                <NuxtLink :to="`/${reply.id}`">
                    <p class="text-2xl">{{ reply.text }}</p>
                </NuxtLink>
            </article>
        </article>
    </div>
</template>

<script setup lang="ts">
const { params } = useRoute()
const { data: post } = await useFetch<Post>(`/api/posts/${params.id}`, { key: `post-${params.id}` })

useHead({
    title: `Post Office - ${post?.value?.author.name} Post`,
})
</script>