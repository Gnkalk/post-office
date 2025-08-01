<template>
    <div>
        <div class="flex items-center gap-2 mb-4" v-if="session.loggedIn">
            <PUAvatar :src="session.photo_url" size="large" shape="rounded" />
            <div>
                <h1 class="text-4xl font-bold">
                    {{ session.first_name }}
                </h1>
                <p>
                    {{ session.username }}
                </p>
            </div>
        </div>
        <article class="border-2 border-stone-900 p-4 rounded-lg mb-1" v-for="post in posts" :key="post.id">
            <PostUser :user="post.author" />
            <NuxtLink :to="`/${post.id}`">
                <p class="text-2xl">{{ post.text }}</p>
            </NuxtLink>
        </article>
    </div>
</template>

<script setup lang="ts">
const { session } = useUser()
const { data: posts } = await useFetch<Post[]>(`/api/posts/user/${session.value.loggedIn ? session.value.id : ''}`)
</script>