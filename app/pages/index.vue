<template>
    <div>
        <form @submit.prevent="submit" class="mb-4">
            <PUTextArea placeholder="Write your post here" v-model="newpost" />
            <PUButton class="w-full">Send</PUButton>
        </form>
        <p v-if="pending">Loading...</p>
        <NuxtLink v-else v-for="post in posts" :key="post.id" :to="`/post/${post.id}`">
            <article class="border-2 border-stone-900 p-4 rounded-lg mb-1">
                <div class="flex items-center gap-2">
                    <PUAvatar :src="post.author.avatar!" shape="rounded" size="small" />
                    <div class="flex flex-col">
                        <div class="text-xl font-bold">
                            {{ post.author.name }}
                        </div>
                        <div class="text-xs">
                            {{ post.author.username }}
                        </div>
                    </div>
                </div>
                <p class="text-2xl">{{ post.text }}</p>
            </article>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const newpost = ref('')
const { data: posts, pending } = await useFetch('/api/posts', { lazy: true })

const submit = async () => {
    await $fetch('/api/posts/create', {
        method: 'POST',
        body: { text: newpost.value },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    newpost.value = ''
}
</script>