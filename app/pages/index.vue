<template>
    <div>
        <form @submit.prevent="submit" class="mb-4">
            <PUTextArea placeholder="Write your post here" v-model="newpost" />
            <PUButton class="w-full">Send</PUButton>
        </form>
        <PUProgress v-if="pending" :progress="50" mode="radial" size="medium" />
        <article v-else v-for="post in posts" :key="post.id" class="border-2 border-stone-900 p-4 rounded mb-1">
            <p class="text-2xl">{{ post.text }}</p>
            <span class="text-sm">- {{ post }}</span>
        </article>
    </div>
</template>

<script setup lang="ts">
const newpost = ref('')
const { data: posts, pending } = await useFetch('/api/posts')

const submit = async () => {
    const res = await $fetch('/api/posts/create', {
        method: 'POST',
        body: { text: newpost.value },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    newpost.value = ''
}
</script>