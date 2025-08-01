<template>
    <div>
        <div class="flex items-center justify-between" v-if="session.loggedIn">
            <div class="flex items-center gap-2 mb-4">
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
            <PUButton icon-left="arrow-up-sm" @click="clearSession()">Logout</PUButton>
        </div>
        <p v-else>You are not logged in</p>
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
const { session, clearSession } = useUser()
onBeforeMount(() => {
    if (session.value.loggedIn) execute()
})
const { data: posts, pending, execute } = await useFetch<Post[]>(`/api/posts/user/${session.value.loggedIn ? session.value.id : ''}`, { lazy: true, immediate: false })

useHead({
    title: `Post Office - Your Profile`,
})
</script>