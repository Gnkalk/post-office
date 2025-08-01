<template>
    <div>
        <div class="flex items-center gap-2 mb-4" v-if="data?.user">
            <PUAvatar :src="data?.user.avatar!" size="large" shape="rounded" />
            <div>
                <h1 class="text-4xl font-bold">
                    {{ data?.user.name }}
                </h1>
                <p>
                    {{ data?.user.username }}
                </p>
            </div>
        </div>
        <article class="border-2 border-stone-900 p-4 rounded-lg mb-1" v-for="post in data?.posts" :key="post.id">
            <PostUser :user="post.author" />
            <NuxtLink :to="`/${post.id}`">
                <p class="text-2xl">{{ post.text }}</p>
            </NuxtLink>
        </article>
    </div>
</template>

<script setup lang="ts">
const { params } = useRoute()
const { data } = await useAsyncData(async () => {
    const user = await $fetch(`/api/user/${params.id}`)
    console.log(user)
    if (!user) return undefined
    const posts = await $fetch(`/api/posts/user/${user.id}`)
    return { user, posts }
})
</script>