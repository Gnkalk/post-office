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
        <Post v-for="post in data?.posts" :key="post.id" :post="post" />
    </div>
</template>

<script setup lang="ts">
const { session } = useUser()
const { params } = useRoute()
const { data } = await useAsyncData(async () => {
    const user = await $fetch(`/api/user/${params.id}`)
    if (!user) return undefined
    const posts = (await $fetch(`/api/posts/user/${user.id}`)).map(post => ({ ...post, publishedAt: new Date(post.publishedAt) }))
    return { user, posts }
})

useHead({
    title: `Post Office - ${data.value?.user.name} Profile`,
})

onBeforeMount(() => {
    if (session.value.loggedIn && session.value.username === params.id) navigateTo('/profile')
})
</script>